// Dynamic Procedural Event Generator for limitless events
const EVENT_TEMPLATES = [
  {
    category: "academic",
    titleTemplate: ["全息选课大决战", "期中论文Deadline", "实验室服务器崩溃", "学术报告会问答", "跨学科研讨会"],
    textTemplate: [
      "选课系统在8点整准时崩溃，你的屏幕上弹出了‘服务器繁忙’的全息红字！",
      "离论文提交还有最后2小时，你发现有一组核心实验数据需要重新测算。",
      "实验室的GPU集群突然发热报警，正在跑的AI大模型训练中断了。",
      "教授在讲台上提了一个硬核难题，全场寂静无声，眼神看向了你。"
    ],
    choices: [
      { text: "硬核攻坚，拼尽全力解决", effect: { academic: 6, skill: 5, stress: 5, health: -2 }, log: "经过不懈努力，你成功化解了危机，获得了极高的锻炼！" },
      { text: "寻求同伴合作求助", effect: { network: 6, academic: 4, happiness: 2 }, log: "众人拾柴火焰高，你与伙伴联手解决了难题。" },
      { text: "淡然处之，顺其自然", effect: { happiness: 5, stress: -4, academic: -3 }, log: "你放下了执念，发现天空依然辽阔。" }
    ]
  },
  {
    category: "life",
    titleTemplate: ["外卖小哥的赛博遭遇", "宿舍断电危机", "二手市场淘宝", "校园流浪猫遇险"],
    textTemplate: [
      "晚上宿舍突然断电，全楼男生爆发出了惊天动地的欢呼与哀嚎声。",
      "你在校园二手交易群里看到一台极度便宜的二手VR眼镜。",
      "路边一只赛博橘猫跳到了你的腿上，发出咕噜咕噜的声音。",
      "夜宵摊的炸串老板多送了你两串考香肠，并夸你帅/美。"
    ],
    choices: [
      { text: "积极参与，享受当下", effect: { happiness: 8, network: 3, wealth: -2 }, log: "心情大好，大学生活充满了奇妙的小确幸。" },
      { text: "理智观察，保持冷静", effect: { wealth: 5, stress: -2 }, log: "你做出了稳重的决定。" }
    ]
  },
  {
    category: "social",
    titleTemplate: ["社团赛博联谊", "夜宵摊谈心", "黑客马拉松组队", "志愿服务日"],
    textTemplate: [
      "朋友约你今晚去学校附近的露天烧烤摊聚餐谈心。",
      "黑客马拉松比赛今晚截止组队，一位神秘高手向你发出了邀请。",
      "社团组织去附近的科技馆做志愿讲解员。"
    ],
    choices: [
      { text: "欣然前往，结交新朋友", effect: { network: 8, happiness: 6, wealth: -3 }, log: "交流非常愉快，你拓展了自己的朋友圈！" },
      { text: "专注自我，沉淀学习", effect: { skill: 6, academic: 4, stress: 2 }, log: "你沉浸在自己的小世界中，技能稳步提升。" }
    ]
  }
];

export function generateProceduralEvent(year, term, index) {
  const template = EVENT_TEMPLATES[index % EVENT_TEMPLATES.length];
  const randomTitle = template.titleTemplate[Math.floor(Math.random() * template.titleTemplate.length)];
  const randomText = template.textTemplate[Math.floor(Math.random() * template.textTemplate.length)];
  
  return {
    id: `dynamic_${year}_${term}_${index}_${Date.now()}`,
    year,
    term,
    isDynamic: true,
    title: `[随机瞬间] ${randomTitle}`,
    text: randomText,
    choices: template.choices
  };
}

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
