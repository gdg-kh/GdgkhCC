# This is a sample submission for SantaCode
# It prints a simple ASCII Christmas tree

def print_tree(height):
    for i in range(height):
        print((' ' * (height - i - 1)) + ('*' * (2 * i + 1)))
    print((' ' * (height - 1)) + '|')

if __name__ == "__main__":
    print_tree(5)
    print("\nMerry Christmas! 🎄")
