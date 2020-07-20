import random


def string_conversion(s, t):
    unused_ht = {}
    for i in range(97, 123):
        unused_ht[chr(i)] = True
    for char in s:
        if char in unused_ht:
            del unused_ht[char]
    letter_graph = {}
    for a, b in zip(s, t):
        if (a not in letter_graph and (b not in letter_graph or (b in letter_graph and len(unused_ht) > 0))) or (a in letter_graph and b == letter_graph[a]):
            letter_graph[a] = b
        else:
            return False
    return True


print(string_conversion("gqwtx", "euyuk"))
