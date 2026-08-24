import subprocess
import sys

lessc, input_file, output, depfile, *options = sys.argv[1:]

deps = subprocess.run(
    [lessc, "--depends", *options, input_file, output],
    check=True, capture_output=True, text=True,
).stdout
with open(depfile, "w", encoding="utf-8") as f:
    f.write(deps)

subprocess.run([lessc, *options, input_file, output], check=True)
