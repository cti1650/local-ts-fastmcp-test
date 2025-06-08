#!/usr/bin/env node

import { FastMCP } from "fastmcp";
import { z } from "zod";

const server = new FastMCP({
  name: "local-ts-fastmcp-test",
  version: "0.1.0",
});

server.addTool({
  name: "double_number",
  description: "与えられた数値を2倍にする",
  parameters: z.object({ num: z.number().describe("数値") }),
  execute: async ({ num }) => ({
    content: [{ type: "text", text: (num * 2).toString() }],
  }),
});

server.addTool({
  name: "pick_random_string",
  description: "文字列の配列からランダムに1つ選ぶ",
  parameters: z.object({
    items: z.array(z.string()).describe("文字列の配列"),
  }),
  execute: async ({ items }) => {
    const choice = items[Math.floor(Math.random() * items.length)];
    return { content: [{ type: "text", text: choice }] };
  },
});

server.addTool({
  name: "shuffle_and_group_strings",
  description:
    "文字列の配列をシャッフルして指定された数のグループに分ける（グループ数 or 1グループの最大人数のどちらかを指定）",
  parameters: z.object({
    items: z.array(z.string()).describe("文字列の配列"),
    groupCount: z
      .number()
      .min(1)
      .optional()
      .describe("グループ数（指定する場合）"),
    maxPerGroup: z
      .number()
      .min(1)
      .optional()
      .describe("1グループの最大人数（指定する場合）"),
  }),
  execute: async ({ items, groupCount, maxPerGroup }) => {
    if ((groupCount && maxPerGroup) || (!groupCount && !maxPerGroup)) {
      throw new Error(
        "グループ数か1グループの最大人数のどちらか1つだけを指定してください"
      );
    }

    const shuffled = [...items].sort(() => Math.random() - 0.5);
    let groups: string[][];

    if (groupCount) {
      groups = Array.from({ length: groupCount }, () => []);
      shuffled.forEach((item, i) => {
        groups[i % groupCount].push(item);
      });
    } else if (maxPerGroup) {
      const groupCountCalculated = Math.ceil(shuffled.length / maxPerGroup);
      groups = Array.from({ length: groupCountCalculated }, () => []);
      shuffled.forEach((item, i) => {
        groups[i % groupCountCalculated].push(item);
      });
    } else {
      groups = [];
    }

    return {
      content: groups.map((group, index) => ({
        type: "text",
        text: `Group ${index + 1}: ${group.join(", ")}`,
      })),
    };
  },
});

server.start({
  transportType: "stdio",
});
