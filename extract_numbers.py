import re
import time

# Ruta del archivo
log_file_path = 'core.class.log'
# Archivo donde se guardarán los números
output_file_path = 'extracted_numbers.txt'

# Encontrar los números de teléfono
phone_number_pattern = re.compile(r"from: '(\d+)'")

# Lista de codificaciones comunes a probar
common_encodings = ['utf-8', 'iso-8859-1', 'latin-1']

# Leer el archivo y extraer los números
def extract_numbers(log_file_path, output_file_path):
    seen_numbers = set()
    for encoding in common_encodings:
        try:
            with open(log_file_path, 'r', encoding=encoding) as log_file:
                log_file.readline()
                break  # Si logra leer la primera línea, la codificación es correcta
        except (UnicodeDecodeError, FileNotFoundError):
            continue
    else:
        print(f"No se pudo determinar la codificación del archivo {log_file_path}.")
        return

    try:
        with open(log_file_path, 'r', encoding=encoding, errors='ignore') as log_file, \
                open(output_file_path, 'a', encoding='utf-8') as output_file:
            while True:
                line = log_file.readline()
                if not line:
                    time.sleep(1)
                    continue
                match = phone_number_pattern.search(line)
                if match:
                    phone_number = match.group(1)
                    if phone_number not in seen_numbers:
                        seen_numbers.add(phone_number)
                        output_file.write(phone_number + '\n')
                        output_file.flush()
    except FileNotFoundError:
        print(f"El archivo {log_file_path} no se encontró.")
    except Exception as e:
        print(f"Ocurrió un error al procesar el archivo: {e}")

# Ejecución
extract_numbers(log_file_path, output_file_path)
