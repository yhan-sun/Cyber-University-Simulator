// Deep Interactive Cyber University Storyline Engine with Hobby, Club, Tag & Choice-Tree Memory

export const HOBBIES_LIST = [
  { id: "coding", label: "💻 极客编程", tag: "GEEK" },
  { id: "e_sports", label: "🎮 电子竞技", tag: "GAMER" },
  { id: "music_art", label: "🎸 摇滚艺术", tag: "ARTIST" },
  { id: "fitness", label: "🏋️ 健身运动", tag: "ATHLETE" },
  { id: "business", label: "💼 商业社团", tag: "ELITE" },
  { id: "anime", label: "🍱 动漫ACG", tag: "OTAKU" }
];

export const INITIAL_STATS = {
  academic: 50,  // 📚 学业
  skill: 50,     // 💻 技能
  wealth: 50,    // 💰 财富
  love: 30,      // ❤️ 爱情
  network: 40,   // 👥 人脉
  happiness: 60, // 😊 快乐
  health: 70,    // 💪 健康
  stress: 20     // 😰 压力
};

// Procedural Rich Generator for Endless Dynamic Storylines
const PROCEDURAL_EVENT_TEMPLATES = [
  // Academic & Research Branch
  {
    category: "academic",
    title: "全息课程期末大作业选拔",
    text: "教授在全息投影前宣布：‘本次大作业将作为期末成绩的60%，优秀者可直接推免实习！’",
    choices: [
      { text: "选择最具挑战性的硬核底层架构课题", effect: { academic: 10, skill: 12, stress: 8 }, tagAdd: "HARDCORE_ACADEMIC", log: "你挑战了硬核课题，老师对你留下了极深的印象。" },
      { text: "组队选择成熟稳妥的防踩雷方案", effect: { academic: 6, network: 6, happiness: 4 }, log: "团队协作顺利，稳稳拿到了优秀成绩。" },
      { text: "在网上找了个开源模板稍微修改交差", effect: { happiness: 8, academic: -4, stress: -5 }, log: "省下了大量时间，去享受大学的休闲时光。" }
    ]
  },

  // Geek & Tech Hobby Branch
  {
    category: "GEEK",
    requireTag: "GEEK",
    title: "赛博极客：暗网漏洞攻防战",
    text: "你在深夜刷技术论坛时，收到一封匿名邮件：‘校内选课服务器存在盲注漏洞，是否修复？’",
    choices: [
      { text: "连夜撰写漏洞修复报告提交给学校网络中心", effect: { skill: 15, network: 10, academic: 5 }, tagAdd: "WHITE_HAT", log: "你成为了校内安全风云人物，获得了技术特别嘉奖！" },
      { text: "编写脚本帮自己和室友抢到了最火爆的神仙选课", effect: { happiness: 12, skill: 8, stress: -4 }, tagAdd: "BLACK_HAT", log: "室友们对你佩服得五体投地，称你为‘选课战神’。" }
    ]
  },

  // E-Sports & Gaming Hobby Branch
  {
    category: "GAMER",
    requireTag: "GAMER",
    title: "电竞社：全省高校联赛选拔赛",
    text: "校园电竞社在招募全国比赛主力队员，试训赛最后一波关键龙团，敌方五人压境。",
    choices: [
      { text: "极限闪现切入敌方后排斩获五杀！", effect: { happiness: 18, skill: 8, network: 10 }, tagAdd: "ESPORTS_MVP", log: "全场沸腾！你成为了校队绝对主力首发队长。" },
      { text: "稳健防守指挥队友翻盘", effect: { network: 12, happiness: 10, stress: -3 }, log: "优秀的指挥带飞全场，展现了极强的团队领袖气质。" }
    ]
  },

  // Artist & Music Hobby Branch
  {
    category: "ARTIST",
    requireTag: "ARTIST",
    title: "摇滚社：草坪音乐节压轴演出",
    text: "舞台灯光汇聚在你身上，数千名同学在台下挥舞荧光棒，主唱示意你弹响开场Solo！",
    choices: [
      { text: "演奏一段狂热激昂的即兴狂想Solo", effect: { happiness: 20, love: 12, network: 10 }, tagAdd: "ROCK_STAR", log: "全场齐声欢呼你的名字，这一夜你成为了全校偶像！" },
      { text: "深情弹唱一首自创的赛博民谣歌曲", effect: { love: 15, happiness: 12, academic: 3 }, tagAdd: "ROMANTIC_ARTIST", log: "深情的歌声感染了台下的某位特别的人。" }
    ]
  },

  // Story Memory Sequential Continuation Event (Branching triggered by previous actions)
  {
    category: "MEMORY_BRANCH",
    requireTag: "WHITE_HAT",
    title: "后续回响：国家安全响应中心调令",
    text: "因为你此前成功修复了校内重大漏洞，国家安全响应中心（CNCERT）向你发出了特邀研讨函。",
    choices: [
      { text: "受邀前往国家安全大楼参与闭门会议", effect: { skill: 20, network: 15, wealth: 10 }, tagAdd: "CYBER_GUARDIAN", log: "你踏入了顶尖安全核心圈层，未来无可限量！" },
      { text: "婉拒邀请，继续专注于自己的本科课程", effect: { academic: 10, happiness: 5 }, log: "你保持了低调与沉淀。" }
    ]
  },

  {
    category: "MEMORY_BRANCH",
    requireTag: "HARDCORE_ACADEMIC",
    title: "后续回响：顶尖学术期刊审稿意见",
    text: "你此前完成的硬核大作业被导师推荐投稿到了国际顶尖期刊IEEE，今天收到了修改意见！",
    choices: [
      { text: "补做两组对比实验，连夜提交返修稿", effect: { academic: 20, skill: 10, stress: 10 }, tagAdd: "IEEE_AUTHOR", log: "论文顺利被正式录用！你成为了本科生中的学术传说。" },
      { text: "撤回投稿，留作毕业设计课题", effect: { academic: 8, stress: -5 }, log: "减轻了当前的压力，为毕设打下了坚实基础。" }
    ]
  }
];

export function generateProceduralEvent(year, term, index, playerTags = []) {
  // Try matching branch events that meet player tags memory
  const memoryCandidates = PROCEDURAL_EVENT_TEMPLATES.filter(t => t.requireTag && playerTags.includes(t.requireTag));
  
  let selectedTemplate;
  if (memoryCandidates.length > 0 && Math.random() > 0.4) {
    selectedTemplate = memoryCandidates[Math.floor(Math.random() * memoryCandidates.length)];
  } else {
    const generalPool = PROCEDURAL_EVENT_TEMPLATES.filter(t => !t.requireTag || playerTags.includes(t.requireTag));
    selectedTemplate = generalPool[Math.floor(Math.random() * generalPool.length)];
  }

  const randomizedId = `dynamic_${year}_${term}_${index}_${Math.floor(Math.random() * 10000)}`;

  return {
    id: randomizedId,
    year,
    term,
    isDynamic: true,
    title: selectedTemplate.title,
    text: selectedTemplate.text,
    choices: selectedTemplate.choices
  };
}
