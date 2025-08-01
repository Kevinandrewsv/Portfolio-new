// src/utils/github.js
import { graphql } from '@octokit/graphql';

export async function fetchFullContributions(username) {
  const graph = graphql.defaults({
    headers: { authorization: `token ${process.env.GITHUB_TOKEN}` },
  });

  const { user } = await graph(
    `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
    `,
    { login: username }
  );

  const weeks = user.contributionsCollection.contributionCalendar.weeks;
  const days = weeks.flatMap((w) =>
    w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))
  );

  return {
    total: user.contributionsCollection.contributionCalendar.totalContributions,
    contributions: days,
  };
}
