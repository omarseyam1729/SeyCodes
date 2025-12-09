const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create sample problems
  const problems = [
    {
      title: 'Check Palindrome',
      description: `Given a string, check if it is a palindrome. A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward as forward.

Example:
Input: "racecar"
Output: true
Explanation: "racecar" reads the same backward as forward.

Function Signature:
bool isPalindrome(string s);`,
      difficulty: 'Easy',
    },
    {
      title: 'Check if Two Strings are Anagrams',
      description: `Given two strings, check if they are anagrams. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Example:
Input: "listen", "silent"
Output: true
Explanation: Both strings contain the same letters.

Function Signature:
bool areAnagrams(string s1, string s2);`,
      difficulty: 'Easy',
    },
    {
      title: 'Maximum Subarray Sum',
      description: `Given an integer array, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example:
Input: [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.

Function Signature:
int maxSubArraySum(int[] nums);`,
      difficulty: 'Medium',
    },
    {
      title: 'Number of Ways in n x n Grid',
      description: `Given a grid of size n x n, find the number of ways to move from the top-left corner to the bottom-right corner. You can only move either down or right at any point in time.

Example:
Input: 2
Output: 2
Explanation: There are two ways: Right->Down and Down->Right.

Function Signature:
int numberOfWays(int n);`,
      difficulty: 'Medium',
    },
    {
      title: 'First Unique Character in a String',
      description: `Given a string, find the first non-repeating character in it and return its index. If it does not exist, return -1.

Example:
Input: "leetcode"
Output: 0
Explanation: The first non-repeating character is "l".

Function Signature:
int firstUniqChar(string s);`,
      difficulty: 'Easy',
    }
  ];

  for (const problem of problems) {
    await prisma.problem.upsert({
      where: { id: problems.indexOf(problem) + 1 },
      update: problem,
      create: problem,
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

