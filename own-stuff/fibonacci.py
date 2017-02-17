def calc(prev, curr):
  return prev + curr

def main_loop():
  previous = 0
  current = 1

  for iterator in range(1,100):
    tmp = previous
    previous = current
    current = calc(tmp, current)
    print(str(iterator) + "(" + str(tmp) + ", " + str(previous) + ")" + ": " + str(current))
  out = previous + current
  print(out)

main_loop()
