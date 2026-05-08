import { recentRepositories, techStats } from "@/features/portfolio/data";

export const getGitHubActivity = async () => {
  await new Promise((resolve) => setTimeout(resolve, 80));

  return {
    contributionWeeks: [22, 35, 18, 44, 39, 55, 28, 47, 61, 42, 34, 50],
    recentRepositories,
    techStats,
  };
};
