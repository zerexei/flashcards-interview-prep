import { Flashcard } from '@/types/flashcard.types';

export const SEED_CARDS: Flashcard[] = [
  // ─── DATA STRUCTURES (1-15) ────────────────────────────────────────────────
  {
    id: 'seed-1',
    question: 'What is Big-O notation and why does it matter?',
    fixedAnswer:
      "Big-O notation expresses the upper bound on an algorithm's time or space complexity as input size (n) grows. " +
      'It lets you compare algorithms independent of hardware. ' +
      'Common complexities: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) merge sort, O(n\u00B2) nested loops.',
    questionPrompt: 'Define and explain',
    tags: ['Big-O / Complexity'],
    difficulty: 2,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-2',
    question: 'What is the difference between a stack and a queue?',
    fixedAnswer:
      'Stack: LIFO (Last-In First-Out) — push/pop from one end. Used in: call stacks, undo operations, DFS. ' +
      'Queue: FIFO (First-In First-Out) — enqueue at back, dequeue from front. Used in: BFS, task scheduling, event queues.',
    questionPrompt: 'Compare and contrast',
    tags: ['Stack', 'Queue'],
    difficulty: 1,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-3',
    question: 'Explain how a hash table works and what happens on collision.',
    fixedAnswer:
      'A hash table maps keys to array indices via a hash function. ' +
      'Collisions are handled by: (1) Chaining — each bucket holds a linked list; ' +
      '(2) Open addressing — probe for the next empty slot. ' +
      'Average O(1) for get/set; worst case O(n) with many collisions.',
    questionPrompt: 'Explain the internals',
    tags: ['Hash Table'],
    difficulty: 3,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-4',
    question: 'What is a Singly Linked List vs a Doubly Linked List?',
    fixedAnswer:
      'Singly Linked List: Each node contains data and a pointer to the next node. ' +
      'Doubly Linked List: Each node has pointers to both next and previous nodes, enabling backward traversal ' +
      'and O(1) deletion if the node is already given, at the cost of O(N) extra pointer memory.',
    questionPrompt: 'Compare memory and pointers',
    tags: ['Linked List'],
    difficulty: 1,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-5',
    question: 'How do you detect a cycle in a Linked List?',
    fixedAnswer:
      "Use Floyd's Cycle-Finding Algorithm (Tortoise and Hare). Run two pointers at different speeds: " +
      'slow moves 1 step at a time, fast moves 2 steps. If they meet, a cycle exists. ' +
      'Time complexity: O(N), Space complexity: O(1).',
    questionPrompt: 'Describe Floyd\'s Algorithm',
    tags: ['Linked List', 'Pointers'],
    difficulty: 2,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-6',
    question: 'What is a Binary Search Tree (BST)?',
    fixedAnswer:
      'A binary tree where for every node: all keys in its left subtree are less than the node key, ' +
      'and all keys in its right subtree are greater than the node key. ' +
      'Average time for search/insert/delete is O(log N); worst case is O(N) if the tree is unbalanced.',
    questionPrompt: 'Define properties and search times',
    tags: ['Tree', 'Binary Search Tree'],
    difficulty: 2,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-7',
    question: 'What is a Trie and when is it useful?',
    fixedAnswer:
      'A Trie (prefix tree) is a search tree used to store associative data structures, typically strings. ' +
      'Keys are represented by paths rather than stored directly in nodes. ' +
      'Extremely useful for autocomplete, spell checkers, and matching longest prefix strings in O(L) time where L is word length.',
    questionPrompt: 'Explain prefix tree operations',
    tags: ['Tree', 'Trie'],
    difficulty: 3,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-8',
    question: 'What is a Max-Heap vs a Min-Heap?',
    fixedAnswer:
      'A binary heap is a complete binary tree. ' +
      'Max-Heap: The key of each node is greater than or equal to the keys of its children. Max key is at the root. ' +
      'Min-Heap: The key of each node is less than or equal to its children. Min key is at the root. ' +
      'Insertion/deletion takes O(log N); peek takes O(1).',
    questionPrompt: 'Explain properties and complexity',
    tags: ['Heap', 'Priority Queue'],
    difficulty: 2,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-9',
    question: 'What is a Graph and its common representations?',
    fixedAnswer:
      'A set of vertices (nodes) connected by edges. Representations: ' +
      '(1) Adjacency Matrix: 2D array indicating connections. Best for dense graphs; lookup is O(1) but uses O(V\u00B2) space. ' +
      '(2) Adjacency List: Array of lists containing neighbors. Best for sparse graphs; space-efficient O(V+E).',
    questionPrompt: 'Representations and trade-offs',
    tags: ['Graphs'],
    difficulty: 2,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-10',
    question: 'What is a Self-Balancing Binary Search Tree?',
    fixedAnswer:
      'A BST that automatically keeps its height as small as possible (typically O(log N)) upon insertions and deletions. ' +
      'Examples: AVL Trees (stricter balancing, faster lookups) and Red-Black Trees (fewer rotations, faster insertions). ' +
      'Ensures O(log N) worst-case time complexity.',
    questionPrompt: 'Name examples and advantage',
    tags: ['Tree', 'Binary Search Tree'],
    difficulty: 3,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-11',
    question: 'Explain the difference between an Array and a List in memory.',
    fixedAnswer:
      'Array: Contiguous block of memory. Indexing is O(1), but insertion/deletion at arbitrary positions is O(N) due to element shifting. ' +
      'List (Linked): Non-contiguous. Elements are linked by pointers. ' +
      'Indexing takes O(N), but insertion/deletion is O(1) once the insertion point is reached.',
    questionPrompt: 'Memory layout comparison',
    tags: ['Array', 'Linked List'],
    difficulty: 1,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-12',
    question: 'What is an Adjacency Matrix vs Adjacency List?',
    fixedAnswer:
      'Adjacency Matrix: V x V boolean/integer grid. Checking if edge (u, v) exists takes O(1) time. ' +
      'Adjacency List: Array of lists where index u contains neighbors of u. Finding all neighbors of u takes O(degree(u)) time. ' +
      'List is preferred for sparse graphs to save space.',
    questionPrompt: 'Graph structures comparison',
    tags: ['Graphs'],
    difficulty: 2,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-13',
    question: 'What is a Hash Map load factor and resizing?',
    fixedAnswer:
      'Load factor is the ratio of stored elements (N) to total buckets (M). ' +
      'When this ratio exceeds a threshold (typically 0.75), the map resizes (doubles buckets) to avoid performance degradation. ' +
      'Resizing requires rehashing all keys, taking O(N) amortized time.',
    questionPrompt: 'Internal resizing mechanism',
    tags: ['Hash Table'],
    difficulty: 3,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-14',
    question: 'What is a Disjoint Set (Union-Find) data structure?',
    fixedAnswer:
      'A structure that keeps track of elements partitioned into non-overlapping sets. ' +
      'Operations: Union (joins sets) and Find (returns set representative). ' +
      'Optimized with Union by Rank and Path Compression to yield near-constant O(\u03B1(N)) amortized time.',
    questionPrompt: 'Union-Find operations',
    tags: ['Union-Find', 'Graphs'],
    difficulty: 4,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-15',
    question: 'What is a Bloom Filter?',
    fixedAnswer:
      'A space-efficient probabilistic data structure used to test if an element is a member of a set. ' +
      'Allows false positive matches, but false negatives are impossible (i.e. returns "possibly in set" or "definitely not in set"). ' +
      'Uses multiple hash functions on a bit array.',
    questionPrompt: 'Probabilistic set representation',
    tags: ['Bloom Filter', 'Hash Table'],
    difficulty: 4,
    cardType: 'understanding',
    isActive: true,
  },

  // ─── ALGORITHMS & PATTERNS (16-30) ──────────────────────────────────────────
  {
    id: 'seed-16',
    question: 'What is the difference between BFS and DFS?',
    fixedAnswer:
      'BFS (Breadth-First Search): explores level by level using a queue. Good for shortest path in unweighted graphs. ' +
      'DFS (Depth-First Search): explores as deep as possible using a stack or recursion. ' +
      'Good for detecting cycles, topological sort, connected components.',
    questionPrompt: 'Compare search approaches',
    tags: ['BFS', 'DFS', 'Graphs'],
    difficulty: 2,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-17',
    question: 'What is dynamic programming and when should you use it?',
    fixedAnswer:
      'DP solves problems by breaking them into overlapping subproblems, storing results (memoization/tabulation) to avoid redundant work. ' +
      "Use it when: (1) the problem has optimal substructure and (2) subproblems overlap. " +
      'Classic examples: Fibonacci, knapsack, longest common subsequence.',
    questionPrompt: 'Explain DP requirements',
    tags: ['Dynamic Programming'],
    difficulty: 4,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-18',
    question: 'How does Binary Search work and what is its complexity?',
    fixedAnswer:
      'A search algorithm that finds the position of a target value within a sorted array. ' +
      'Divides search interval in half recursively: if target is less than middle value, narrow to lower half; ' +
      'otherwise, narrow to upper half. Time: O(log N), Space: O(1) iterative or O(log N) recursive.',
    questionPrompt: 'Explain search criteria',
    tags: ['Sorting / Searching'],
    difficulty: 1,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-19',
    question: 'What is Quick Sort vs Merge Sort?',
    fixedAnswer:
      'Merge Sort: Divide-and-conquer. Splits array in half, recursively sorts, and merges. Stable. O(N log N) time, but requires O(N) extra space. ' +
      'Quick Sort: Partitioning. Picks a pivot, places smaller elements left and larger right. Unstable. O(N log N) average, O(N\u00B2) worst-case. In-place.',
    questionPrompt: 'Compare stable vs unstable sorting',
    tags: ['Sorting / Searching'],
    difficulty: 3,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-20',
    question: 'Explain the Sliding Window technique.',
    fixedAnswer:
      'A technique that uses a subsegment of data (the window) over an array/string to solve problems. ' +
      'Avoids nested loops by shifting the window left/right boundaries dynamically. ' +
      'Transforms O(N\u00B2) brute-force searches into O(N) linear time complexities.',
    questionPrompt: 'Explain sliding bounds',
    tags: ['Sliding Window', 'Array'],
    difficulty: 2,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-21',
    question: 'What is Dijkstra\'s Algorithm?',
    fixedAnswer:
      'An algorithm for finding the shortest paths between nodes in a graph with non-negative edge weights. ' +
      'Uses a Min-Priority Queue to repeatedly select the unvisited node with the smallest distance, ' +
      'updating distances of its neighbors. Time: O((V + E) log V).',
    questionPrompt: 'Graph pathfinding constraints',
    tags: ['Graphs', 'Dijkstra'],
    difficulty: 3,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-22',
    question: 'What is the difference between recursion and iteration?',
    fixedAnswer:
      'Recursion: A function calling itself. Clearer code but risks Call Stack Overflow if base case is not met, ' +
      'and consumes O(N) memory. Iteration: Loop structures (while/for) executed sequentially. ' +
      'Safer stack footprint and O(1) auxiliary memory.',
    questionPrompt: 'Stack frame trade-off',
    tags: ['Recursion'],
    difficulty: 1,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-23',
    question: 'Explain the Two-Pointer technique.',
    fixedAnswer:
      'Using two pointers to iterate through data structures (typically arrays or lists) simultaneously. ' +
      'Pointers can move in the same direction (fast/slow) or opposite directions (left/right). ' +
      'Used for finding target pairs in sorted arrays, checking palindromes, and reversing segments in O(N) time.',
    questionPrompt: 'Explain pointer directions',
    tags: ['Two Pointer', 'Array'],
    difficulty: 2,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-24',
    question: 'What is a Greedy Algorithm?',
    fixedAnswer:
      'An algorithmic paradigm that makes the locally optimal choice at each step with the hope of finding a global optimum. ' +
      'Does not re-evaluate past choices. Fast and simple but does not guarantee global optimal results for all problems ' +
      '(e.g., Fractional Knapsack is optimal, but 0/1 Knapsack is not).',
    questionPrompt: 'Describe local vs global optimum',
    tags: ['Greedy'],
    difficulty: 3,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-25',
    question: 'Explain Backtracking.',
    fixedAnswer:
      'A systematic search method that builds candidates to a solution incrementally, and abandons a candidate ("backtracks") ' +
      'as soon as it determines that the candidate cannot possibly lead to a valid solution. ' +
      'Commonly used in permutations, N-Queens, Sudoku solving. Time is typically exponential O(2\u1D3A / N!).',
    questionPrompt: 'Incremental path finding strategy',
    tags: ['Backtracking'],
    difficulty: 4,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-26',
    question: 'What is Topological Sort?',
    fixedAnswer:
      'A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, ' +
      'vertex u comes before v. Used for scheduling tasks, resolving dependencies, and compiler builds. ' +
      'Can be computed using DFS (Kahn\'s algorithm / indegree BFS). O(V+E) time.',
    questionPrompt: 'DAG ordering criteria',
    tags: ['Graphs', 'Topological Sort'],
    difficulty: 3,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-27',
    question: 'What is A* Search?',
    fixedAnswer:
      'A graph traversal and path planning algorithm that finds the shortest path between a starting node and a goal. ' +
      'Extends Dijkstra\'s algorithm by using heuristics to estimate cost to goal. ' +
      'Score f(n) = g(n) + h(n), where g is actual cost and h is heuristic cost.',
    questionPrompt: 'Heuristic-based pathfinding',
    tags: ['A* Search', 'Graphs'],
    difficulty: 4,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-28',
    question: 'Explain the difference between Tabulation and Memoization in DP.',
    fixedAnswer:
      'Memoization: Top-Down approach. Solves the problem recursively, storing results of subproblems. ' +
      'Tabulation: Bottom-Up approach. Solves subproblems iteratively, starting from base cases, ' +
      'filling up a table (typically a 1D or 2D array). Tabulation avoids call stack overhead.',
    questionPrompt: 'DP direction strategies',
    tags: ['Dynamic Programming'],
    difficulty: 3,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-29',
    question: 'What is Kadane\'s Algorithm?',
    fixedAnswer:
      'An O(N) dynamic programming algorithm used to find the contiguous subarray with the largest sum ' +
      'within a 1D array of numbers. Keeps track of the maximum sum ending at the current index ' +
      'and updates the global maximum accordingly.',
    questionPrompt: 'Maximum subarray sum solution',
    tags: ['Dynamic Programming', 'Array'],
    difficulty: 2,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-30',
    question: 'What is a stable sort algorithm?',
    fixedAnswer:
      'A sorting algorithm is stable if it preserves the relative order of equal keys/elements from the original input. ' +
      'Stable algorithms: Merge Sort, Insertion Sort, Bubble Sort. ' +
      'Unstable algorithms: Quick Sort, Heap Sort.',
    questionPrompt: 'Relative order preservation',
    tags: ['Sorting / Searching'],
    difficulty: 2,
    cardType: 'recall',
    isActive: true,
  },

  // ─── SYSTEM DESIGN & ARCHITECTURE (31-45) ───────────────────────────────────
  {
    id: 'seed-31',
    question: 'What is a CDN (Content Delivery Network)?',
    fixedAnswer:
      'A globally distributed network of proxy servers deployed in multiple data centers. ' +
      'Caches static assets (images, CSS, JS) closer to users (Edge servers) ' +
      'to reduce latency and offload traffic from the origin server.',
    questionPrompt: 'Distributed static resource caching',
    tags: ['CDN', 'System Design'],
    difficulty: 2,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-32',
    question: 'Explain the CAP Theorem.',
    fixedAnswer:
      'States that a distributed data store can simultaneously provide at most two of the following three guarantees: ' +
      'Consistency (every read receives most recent write), ' +
      'Availability (every non-failing node returns a response), ' +
      'Partition Tolerance (system operates despite network splits). Partition tolerance is non-negotiable in real systems.',
    questionPrompt: 'Distributed database trade-offs',
    tags: ['CAP Theorem', 'System Design'],
    difficulty: 3,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-33',
    question: 'What is Load Balancing and common algorithms?',
    fixedAnswer:
      'A device/software that distributes network traffic across a cluster of servers to optimize resource utilization ' +
      'and prevent overloading single nodes. Algorithms: Round Robin, Weighted Round Robin, ' +
      'Least Connections, Least Response Time, IP Hash.',
    questionPrompt: 'Traffic distribution strategies',
    tags: ['Load Balancer', 'System Design'],
    difficulty: 2,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-34',
    question: 'Explain SQL vs NoSQL databases.',
    fixedAnswer:
      'SQL (Relational): Structured schemas, tables, ACID compliance, complex JOINs. Scales vertically. Good for transactional / financial data. ' +
      'NoSQL (Non-Relational): Flexible schemas (document, key-value, column, graph), eventual consistency. Scales horizontally. Good for unstructured / big data.',
    questionPrompt: 'Relational vs Document-based stores',
    tags: ['Databases', 'System Design'],
    difficulty: 2,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-35',
    question: 'What is Database Sharding?',
    fixedAnswer:
      'A horizontal partitioning technique that splits a single database into smaller, faster, and more manageable databases ' +
      'called shards. Shards store subsets of rows based on a shard key (e.g. hash of user ID). ' +
      'Helps scale database writes horizontally.',
    questionPrompt: 'Horizontal database partition scale',
    tags: ['Sharding', 'System Design'],
    difficulty: 3,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-36',
    question: 'What is the Cache Aside (Lazy Loading) pattern?',
    fixedAnswer:
      'A caching pattern where the application queries the cache first. If a hit occurs, cached data is returned. ' +
      'On a cache miss, the application reads from the database, writes the results to the cache, ' +
      'and returns it. Writes update the database directly and invalidate the cache.',
    questionPrompt: 'Describe Lazy Caching strategy',
    tags: ['Caching', 'System Design'],
    difficulty: 3,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-37',
    question: 'What is horizontal vs vertical scaling?',
    fixedAnswer:
      'Vertical scaling (Scale Up): Adding more power (CPU, RAM) to an existing server. Simple, but has a hardware ceiling and causes single points of failure. ' +
      'Horizontal scaling (Scale Out): Adding more servers to the pool. Limits resource ceilings and improves redundancy, but introduces distributed system complexity.',
    questionPrompt: 'Scale up vs Scale out',
    tags: ['System Design'],
    difficulty: 1,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-38',
    question: 'What is a Message Queue and why use it?',
    fixedAnswer:
      'An asynchronous communication channel (e.g. RabbitMQ, Kafka) that decouples producers and consumers. ' +
      'Benefits: (1) Buffers traffic spikes (load leveling), (2) Improves fault tolerance (retries), ' +
      '(3) Decouples microservices so writes can resolve asynchronously.',
    questionPrompt: 'Asynchronous event queuing advantages',
    tags: ['Message Queue', 'System Design'],
    difficulty: 2,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-39',
    question: 'Explain Eventual Consistency.',
    fixedAnswer:
      'A consistency model used in distributed systems where data updates are not guaranteed to propagate to all replica nodes immediately. ' +
      'Instead, given time and no new updates, all replicas will eventually contain identical values. ' +
      'Trading off strict consistency for high availability (BASE model).',
    questionPrompt: 'Define BASE model consistency',
    tags: ['CAP Theorem', 'System Design'],
    difficulty: 3,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-40',
    question: 'What is a reverse proxy?',
    fixedAnswer:
      'A server positioned in front of web servers that forwards client requests to those servers. ' +
      'Used for load balancing, security, SSL termination, caching, and compression. ' +
      'Clients are unaware they are talking to a reverse proxy (unlike a forward proxy).',
    questionPrompt: 'Inbound request routing shield',
    tags: ['System Design'],
    difficulty: 2,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-41',
    question: 'What is Rate Limiting and standard algorithms?',
    fixedAnswer:
      'A mechanism that limits the number of requests a client can make to a server in a given timeframe. ' +
      'Protects APIs from denial-of-service (DoS) attacks and resource exhaustion. ' +
      'Algorithms: Token Bucket, Leaky Bucket, Fixed Window Counter, Sliding Window Log.',
    questionPrompt: 'API requests throttling',
    tags: ['System Design'],
    difficulty: 3,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-42',
    question: 'What is microservices architecture vs monolith?',
    fixedAnswer:
      'Monolith: Single, unified deployment unit. Easy to develop and test initially, but scaling and deployment become bottlenecks. ' +
      'Microservices: Decentralized, small services communicating via APIs (HTTP/gRPC/MQ). ' +
      'Independently deployable, but introduces data consistency and deployment orchestration complexities.',
    questionPrompt: 'Distributed vs Unified systems',
    tags: ['System Design'],
    difficulty: 2,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-43',
    question: 'Explain Cache Eviction policies.',
    fixedAnswer:
      'Mechanisms used to decide which elements to remove from cache when it is full. ' +
      'LRU (Least Recently Used): Evicts the item that has not been accessed for the longest time. ' +
      'LFU (Least Frequently Used): Evicts the item with lowest access frequency. ' +
      'FIFO: First-in, first-out.',
    questionPrompt: 'Cache cleaning rules',
    tags: ['Caching', 'System Design'],
    difficulty: 3,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-44',
    question: 'What is database replication (Leader-Follower)?',
    fixedAnswer:
      'Copying data from one database server (Leader) to multiple servers (Followers). ' +
      'Writes go to the Leader; reads can go to both. ' +
      'Improves read performance and provides failover redundancy. Propagation can be sync or async.',
    questionPrompt: 'Read scaling database replica model',
    tags: ['Databases', 'System Design'],
    difficulty: 3,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-45',
    question: 'What is DNS (Domain Name System)?',
    fixedAnswer:
      'The phonebook of the Internet. Resolves human-readable domain names (e.g. google.com) ' +
      'into machine-readable IP addresses (e.g. 142.250.190.46) using a hierarchical distributed registry ' +
      'and recursive caching resolvers.',
    questionPrompt: 'IP-Domain lookup system',
    tags: ['System Design'],
    difficulty: 1,
    cardType: 'recall',
    isActive: true,
  },

  // ─── NETWORKING, CONCURRENCY & OS (46-50) ───────────────────────────────────
  {
    id: 'seed-46',
    question: 'What is a Process vs a Thread?',
    fixedAnswer:
      'Process: An executing instance of a program with its own dedicated memory space (heap, stack, registers). ' +
      'Threads: Lightweight executing paths within a process that share the process\'s heap memory ' +
      'but have their own stack space. Threads share memory, processes do not.',
    questionPrompt: 'OS isolation boundaries comparison',
    tags: ['OS / Concurrency'],
    difficulty: 2,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-47',
    question: 'Explain the Javascript Event Loop.',
    fixedAnswer:
      'JS is single-threaded. Execution context handles synchronous code on the call stack. ' +
      'Asynchronous callbacks go to the Task Queue (macro) or Microtask Queue (Promises). ' +
      'When the call stack is empty, the Event Loop pushes microtasks first, then macrotasks onto the stack to execute.',
    questionPrompt: 'JS asynchronous event runtime',
    tags: ['JS Internals', 'Concurrency'],
    difficulty: 3,
    cardType: 'understanding',
    isActive: true,
  },
  {
    id: 'seed-48',
    question: 'What is a Deadlock and Coffman conditions?',
    fixedAnswer:
      'A state where two or more threads/processes are unable to proceed because each is waiting for the other to release resources. ' +
      'Coffman conditions: (1) Mutual Exclusion, (2) Hold and Wait, ' +
      '(3) No Preemption, (4) Circular Wait. Breaking any condition prevents deadlocks.',
    questionPrompt: 'Thread execution lockouts',
    tags: ['OS / Concurrency'],
    difficulty: 4,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-49',
    question: 'Explain TCP vs UDP.',
    fixedAnswer:
      'TCP: Connection-oriented, reliable (guarantees packet arrival and order), performs congestion control via handshakes (SYN, SYN-ACK, ACK). Slower. ' +
      'UDP: Connectionless, unreliable, lightweight (no guarantee of arrival or order). Faster. Good for video streaming, gaming, DNS.',
    questionPrompt: 'Reliable vs stream transport layers',
    tags: ['Networking'],
    difficulty: 1,
    cardType: 'recall',
    isActive: true,
  },
  {
    id: 'seed-50',
    question: 'What is Optimistic vs Pessimistic locking?',
    fixedAnswer:
      'Optimistic: Assumes collisions are rare. Reads data, makes modifications, checks if data has changed (via version tag) before writing. If changed, roll back/retry. ' +
      'Pessimistic: Assumes collisions are likely. Locks the resource/row immediately upon reading to prevent anyone else from writing until the lock is released.',
    questionPrompt: 'Concurrent data access locks',
    tags: ['OS / Concurrency', 'Databases'],
    difficulty: 3,
    cardType: 'understanding',
    isActive: true,
  }
];
