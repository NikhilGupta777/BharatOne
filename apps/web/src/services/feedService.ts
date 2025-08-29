import type { Post, User } from '../lib/types';

// --- Scoring Weights ---
const WEIGHTS = {
  RECENCY: 1.5,      // Emphasize newer posts
  ENGAGEMENT: 1.0,   // Base weight for interactions
  AFFINITY: 2.0,     // Heavily prioritize posts from followed users
};

const ENGAGEMENT_SCORES = {
  like: 1,
  comment: 3,
  repost: 5,
};

// Recency decay: score diminishes over 48 hours
const RECENCY_DECAY_HOURS = 48;

/**
 * Calculates a score for a single post based on a deterministic algorithm.
 * @param post - The post to score.
 * @param currentUser - The user for whom the feed is being generated.
 * @returns A numeric score for the post.
 */
const calculatePostScore = (post: Post, currentUser: User): number => {
  // 1. Recency Score
  const hoursAgo = (new Date().getTime() - post.createdAt.getTime()) / (1000 * 60 * 60);
  // Score is higher for recent posts, decays linearly to 0 over RECENCY_DECAY_HOURS
  const recencyScore = Math.max(0, 1 - (hoursAgo / RECENCY_DECAY_HOURS));

  // 2. Engagement Score
  const engagementScore = 
    (post.likes * ENGAGEMENT_SCORES.like) +
    // FIX: Use post.comments.length for calculation as post.comments is an array.
    (post.comments.length * ENGAGEMENT_SCORES.comment) +
    (post.reposts * ENGAGEMENT_SCORES.repost);
  // Normalize engagement score to prevent huge numbers from dominating
  const normalizedEngagement = Math.log1p(engagementScore);

  // 3. Affinity Score
  // 1 if the current user follows the post author, 0 otherwise
  const affinityScore = currentUser.following.has(post.author.id) ? 1 : 0;
  
  // Final Weighted Score
  const finalScore = 
    (recencyScore * WEIGHTS.RECENCY) +
    (normalizedEngagement * WEIGHTS.ENGAGEMENT) +
    (affinityScore * WEIGHTS.AFFINITY);

  return finalScore;
};

/**
 * Sorts a list of posts based on a ranking algorithm.
 * The feed ranking is deterministic and prioritizes recency, engagement, and affinity.
 * 
 * @param posts - An array of posts to be ranked.
 * @param currentUser - The user viewing the feed.
 * @returns A new array of posts sorted by relevance.
 */
export const getRankedFeed = (posts: Post[], currentUser: User): Post[] => {
  // Create a copy to avoid mutating the original array
  const postsCopy = [...posts];

  // Sort posts in descending order based on their calculated score
  postsCopy.sort((a, b) => {
    const scoreA = calculatePostScore(a, currentUser);
    const scoreB = calculatePostScore(b, currentUser);
    return scoreB - scoreA;
  });

  // TODO: Implement type diversity and repetition penalties for a more advanced feed.
  // This would involve iterating through the sorted list and slightly penalizing
  // posts that are too similar to the ones preceding them.

  return postsCopy;
};