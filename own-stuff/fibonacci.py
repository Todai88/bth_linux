def calc(prev, curr):
  if (prev == 0 and curr == 0):
    return 1
  return prev + curr

def main_loop():
  previous = 0
  current = 0

  for iterator in range(1,101):
    tmp = previous
    previous = current
    current = calc(tmp, current)
    print(str(iterator) + "(" + str(tmp) + ", " + str(previous) + ")" + ": " + str(tmp + previous))
  out = previous + current
  print(out)

main_loop()
