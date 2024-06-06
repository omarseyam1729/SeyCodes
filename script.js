const { Problem } = require('./models'); // Adjust the path as necessary

async function populateMultipleProblems() {
  const problems = [
    {
      problemId: 1, // Assign a unique ID
      title: 'Check Palindrome',
      description: `
        <p>Given a string, check if it is a palindrome. A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward as forward.</p>
        <h3>Example:</h3>
        <pre>
        Input: "racecar"
        Output: true
        Explanation: "racecar" reads the same backward as forward.
        </pre>
        <h3>Function Signature:</h3>
        <pre>
        bool isPalindrome(string s);
        </pre>
      `,
      difficulty: 'Easy',
    },
    {
      problemId: 2, // Assign a unique ID
      title: 'Check if Two Strings are Anagrams',
      description: `
        <p>Given two strings, check if they are anagrams. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.</p>
        <h3>Example:</h3>
        <pre>
        Input: "listen", "silent"
        Output: true
        Explanation: Both strings contain the same letters.
        </pre>
        <h3>Function Signature:</h3>
        <pre>
        bool areAnagrams(string s1, string s2);
        </pre>
      `,
      difficulty: 'Easy',
    },
    {
      problemId: 3, // Assign a unique ID
      title: 'Maximum Subarray Sum',
      description: `
        <p>Given an integer array, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.</p>
        <h3>Example:</h3>
        <pre>
        Input: [-2,1,-3,4,-1,2,1,-5,4]
        Output: 6
        Explanation: [4,-1,2,1] has the largest sum = 6.
        </pre>
        <h3>Function Signature:</h3>
        <pre>
        int maxSubArraySum(int[] nums);
        </pre>
      `,
      difficulty: 'Medium',
    },
    {
      problemId: 4, // Assign a unique ID
      title: 'Number of Ways in n x n Grid',
      description: `
        <p>Given a grid of size n x n, find the number of ways to move from the top-left corner to the bottom-right corner. You can only move either down or right at any point in time.</p>
        <h3>Example:</h3>
        <pre>
        Input: 2
        Output: 2
        Explanation: There are two ways: Right->Down and Down->Right.
        </pre>
        <h3>Function Signature:</h3>
        <pre>
        int numberOfWays(int n);
        </pre>
      `,
      difficulty: 'Medium',
    },
    {
      problemId: 5, // Assign a unique ID
      title: 'First Unique Character in a String',
      description: `
        <p>Given a string, find the first non-repeating character in it and return its index. If it does not exist, return -1.</p>
        <h3>Example:</h3>
        <pre>
        Input: "leetcode"
        Output: 0
        Explanation: The first non-repeating character is "l".
        </pre>
        <h3>Function Signature:</h3>
        <pre>
        int firstUniqChar(string s);
        </pre>
      `,
      difficulty: 'Easy',
    }
  ];

  try {
    await Problem.bulkCreate(problems);
    console.log('Problems successfully populated');
  } catch (error) {
    console.error('Error populating problems:', error);
  }
}

populateMultipleProblems();
