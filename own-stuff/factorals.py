from collections import Counter

def isprime(n):
    """Using the AKS algorithm, as suggeted by Wikipedia and SO"""
    if n == 2:
        return True
    if n == 3:
        return True
    if n % 2 == 0:
        return False
    if n % 3 == 0:
        return False

    i = 5
    w = 2

    while i * i <= n:
        if n % i == 0:
            return False

        i += w
        w = 6 - w

    return True

prime_list = []


for i in range(1,100):
  if isprime(i):
    prime_list.append(i)

print prime_list
output = 1
for prime in prime_list:
  if prime <= 10 and prime > 1:
    tmp = prime
    count = 0
    while (tmp <= 100):
      tmp *= prime
      count += 1
    print str(prime) + "^" + str(count) + " = " + str(pow(prime, count))
    prime = pow(prime, count)

  print prime
  output *= prime

print output
