import math

import pandas
from sqlalchemy.orm import Session

from app.models import ProcessingFile, ProcessingStatus


def excel_file_process(file_id: int, db: Session):
    file_proc = db\
        .query(ProcessingFile)\
        .filter(ProcessingFile.id == file_id, ProcessingFile.status == ProcessingStatus.uploaded)\
        .first()
    if file_proc is None:
        return

    # Устанавливаем статус InProgress
    file_proc.status = ProcessingStatus.in_progress
    db.add(file_proc)
    db.commit()

    # Обработка файла
    try:
        status, msg = excel_file_calculate(file_proc.path)
    except Exception as e:
        file_proc.status = ProcessingStatus.error
        file_proc.error = str(e)
        db.add(file_proc)
        db.commit()

        return

    file_proc.status = status
    if ProcessingStatus.error == status:
        file_proc.error = msg
    else:
        file_proc.result = msg

    db.add(file_proc)
    db.commit()


def excel_file_calculate(file_path: str) -> (int, str):
    try:
        xls = pandas.read_excel(file_path, sheet_name=None)
    except ValueError as e:
        return ProcessingStatus.error, str(e)

    # Проверка наличие одного листа с колонками `after` и `before`
    sheet_name = None
    for k in xls.keys():
        sheet = xls[k]
        if 'after' in sheet.columns and 'before' in sheet.columns:
            if sheet_name is None:
                sheet_name = k
            else:
                return ProcessingStatus.error, "Data to be processed contains more than one sheet"

    if sheet_name is None:
        return ProcessingStatus.error, "Not found after or before column"

    # Обработка данных из колонок `after` и `before`
    sheet = xls[sheet_name]
    try:
        # По заданию недопустимо использовать pandas для обработки данных
        after = excel_file_get_column_data(list(sheet.after))
        before = excel_file_get_column_data(list(sheet.before))
    except ValueError:
        return ProcessingStatus.error, "Incorrect value in after or before column"

    len_diff = len(after) - len(before)
    if abs(len_diff) > 1:
        return ProcessingStatus.error, \
               "The count of elements between after and before columns is greater than one"
    elif len_diff > 0:
        (val,) = after - before
        return ProcessingStatus.finished, "added: {}".format(val)
    elif len_diff < 0:
        (val,) = before - after
        return ProcessingStatus.finished, "removed: {}".format(val)
    else:
        return ProcessingStatus.error, \
               "The number of elements in the after and before columns is the same"


def excel_file_get_column_data(column: list) -> set:
    ind = -1
    for i in range(len(column)):
        if column[i] is None or math.isnan(column[i]):
            break
        else:
            ind = i

    return set([int(i) for i in column[:ind + 1]])
