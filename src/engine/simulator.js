// Procedural Event Generator with Organic Tag Collection & Memory Echoes

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

// Rich procedural pool spanning diverse university moments & dynamic memory triggers
const DYNAMIC_EVENT_TEMPLATES = [
  // Geek & Coding Branch
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

  // E-Sports & Gaming Branch
  {
    category: "GAMER",
    requireTag: "GAMER",
    title: "电竞社：全省高校联赛决赛",
    text: "校园电竞社在全国高校联赛打到了决赛最后一局，比分2:2平，远古龙团战一触即发！",
    choices: [
      { text: "极限闪现切入敌方后排斩获五杀收割！", effect: { happiness: 20, skill: 10, network: 12 }, tagAdd: "ESPORTS_MVP", log: "全场沸腾！你拿下了全国高校总决赛 MVP！" },
      { text: "稳健防守指挥队友偷家翻盘", effect: { network: 15, happiness: 15, stress: -4 }, log: "优秀的指挥带飞全场，展现了极强的团队领袖气质。" }
    ]
  },

  // Artist & Music Branch
  {
    category: "ARTIST",
    requireTag: "ARTIST",
    title: "摇滚艺术：草坪音乐节压轴演出",
    text: "舞台灯光汇聚在你身上，数千名同学在台下挥舞荧光棒，主唱示意你弹响开场Solo！",
    choices: [
      { text: "演奏一段狂热激昂的吉他狂想Solo", effect: { happiness: 20, love: 14, network: 12 }, tagAdd: "ROCK_STAR", log: "全场齐声欢呼你的名字，这一夜你成为了全校偶像！" },
      { text: "深情弹唱一首自创的赛博民谣歌曲", effect: { love: 18, happiness: 14, academic: 3 }, tagAdd: "ROMANTIC_ARTIST", log: "深情的歌声感染了台下的某位特别的人。" }
    ]
  },

  // Business & Elite Branch
  {
    category: "ELITE",
    requireTag: "ELITE",
    title: "商业精英：天使投资路演答辩",
    text: "在科技园孵化器路演厅里，面对三位顶级VC投资人，你只有3分钟时间展示商业计划书。",
    choices: [
      { text: "用扎实的市场数据与高门槛壁垒说服投资人", effect: { wealth: 25, network: 18, skill: 10 }, tagAdd: "VENTURE_CAPITAL", log: "投资人当场敲定意向书，拿到了第一笔百万级投资！" },
      { text: "用极具感染力的赛博愿景梦想故事打动全场", effect: { network: 20, happiness: 12, wealth: 15 }, tagAdd: "VISIONARY", log: "你的演讲视频在创业圈爆火，引发多方关注。" }
    ]
  },

  // Memory Sequential Echo Events
  {
    category: "MEMORY_ECHO",
    requireTag: "WHITE_HAT",
    title: "因果回响：国家网络安全响应中心调令",
    text: "因为你此前成功修复了校内重大漏洞，国家网络安全中心（CNCERT）向你发出了特邀研讨函。",
    choices: [
      { text: "受邀前往首都参与顶级网络安全闭门研讨", effect: { skill: 22, network: 18, wealth: 12 }, tagAdd: "CYBER_GUARDIAN", log: "你踏入了顶尖安全核心圈层，未来无可限量！" },
      { text: "婉拒邀请，继续专注于自己的本科课程", effect: { academic: 12, happiness: 6 }, log: "你保持了低调与沉淀。" }
    ]
  },

  {
    category: "MEMORY_ECHO",
    requireTag: "LAB_MEMBER",
    title: "因果回响：顶级学术期刊 IEEE 审稿反馈",
    text: "你在实验室完成的论文被导师推荐投稿到了国际顶尖期刊，今天收到了专家审稿意见！",
    choices: [
      { text: "补做两组对比实验，连夜提交返修稿", effect: { academic: 25, skill: 12, stress: 10 }, tagAdd: "IEEE_AUTHOR", log: "论文顺利被正式录用！你成为了本科生中的学术传奇。" },
      { text: "撤回投稿，留作毕业设计课题", effect: { academic: 10, stress: -5 }, log: "减轻了当前的压力，为毕设打下了坚实基础。" }
    ]
  }
];

export function generateProceduralEvent(year, term, index, playerTags = []) {
  const memoryCandidates = DYNAMIC_EVENT_TEMPLATES.filter(t => t.requireTag && playerTags.includes(t.requireTag));
  
  let selectedTemplate;
  if (memoryCandidates.length > 0 && Math.random() > 0.3) {
    selectedTemplate = memoryCandidates[Math.floor(Math.random() * memoryCandidates.length)];
  } else {
    const generalPool = DYNAMIC_EVENT_TEMPLATES.filter(t => !t.requireTag || playerTags.includes(t.requireTag));
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
