// Vast Expanded Category Generators for Unlimited Cyber University Experience

const ACADEMIC_EVENTS = [
  {
    title: "高数期中全息模拟考",
    text: "全息考场上，试卷第三道大题是关于‘多元微积分在神经网络反向传播中的应用’，全场响起了深深的叹息声。",
    choices: [
      { text: "运筹帷幄，熟练写下完整推导过程", effect: { academic: 8, skill: 5, stress: 3 }, log: "考了全班最高分，老师把你作为优秀答卷全班展示。" },
      { text: "交白卷并写下：‘此题超出碳基生物理解范畴’", effect: { happiness: 6, academic: -6, stress: -4 }, log: "考卷上了校园墙搞笑榜，虽然拿了0分但收获了快乐。" },
      { text: "在试卷边缘画了一只赛博朋克风格的猫", effect: { happiness: 8, network: 3, academic: -2 }, log: "老师给你批了个‘画工不错，+2分辛苦分’。" }
    ]
  },
  {
    title: "跨学科前沿量子计算讲座",
    text: "中科院院士来到学校大礼堂做‘量子纠缠与赛博意识’报告，座位早早就被抢光了，连走廊都挤满了人。",
    choices: [
      { text: "提前一小时去占第一排，全程录音做笔记", effect: { academic: 10, skill: 8, stress: 4 }, log: "收获颇丰，讲座结束后还向院士提出了一个深刻的学术问题。" },
      { text: "坐在最后一排戴着耳机打手机游戏", effect: { happiness: 6, academic: -2, health: -2 }, log: "虽然没听讲座，但排位赛打上了王者段位。" }
    ]
  },
  {
    title: "毕业论文第一次开题答辩",
    text: "面对台上五位表情严肃的答辩专家教授，你的全息PPT刚刚播放到第二页：‘研究背景与创新点’。",
    choices: [
      { text: "从容不迫地讲解算法模型与创新架构", effect: { academic: 12, skill: 10, stress: 8 }, log: "答辩组组长微微点头：‘逻辑很严密，通过！’" },
      { text: "诚恳认错：‘教授们指出的问题都对，我回去全改！’", effect: { academic: 5, network: 5, stress: 2 }, log: "态度极其谦逊，教授们手下留情让你有条件通过。" }
    ]
  }
];

const TECH_EVENTS = [
  {
    title: "48小时赛博黑客马拉松",
    text: "体育馆里灯火通明，几百名程序员正在红牛与咖啡的伴随下通宵写代码。你的团队离Demo展示还有4小时，但遇到了严重Bug。",
    choices: [
      { text: "吞下一颗红牛，连续通宵重构底层数据接口", effect: { skill: 15, health: -8, stress: 10, wealth: 10 }, log: "在最后15分钟调通了Bug，斩获了黑客马拉松一等奖！" },
      { text: "果断砍掉复杂功能，只展示核心MVP流程", effect: { skill: 10, happiness: 5, stress: -2 }, log: "展示极其流畅，获得了‘最佳架构设计奖’。" }
    ]
  },
  {
    title: "GitHub开源项目破千Star",
    text: "你大二闲暇时写的赛博辅助小工具突发被HackNews头条推荐，代码仓库的Notification狂刷爆表！",
    choices: [
      { text: "连夜撰写完善的英文文档与CI/CD自动构建流程", effect: { skill: 18, network: 12, academic: 5 }, log: "许多海外大厂大佬给你点了Star并提交了PR！" },
      { text: "在README最上方贴上自己的收款码：‘求捐赠买咖啡’", effect: { wealth: 15, happiness: 8, network: 4 }, log: "收到了一打咖啡赞助，小赚了一笔！" }
    ]
  }
];

const SOCIAL_LOVE_EVENTS = [
  {
    title: "草坪音乐节的荧光海",
    text: "夜幕降临，操场上正在举行草坪音乐节。伴随着摇滚乐队的吉他Solo，身旁的朋友把一支发光的荧光棒递给了你。",
    choices: [
      { text: "大声跟着主唱合唱，在草坪上尽情挥舞双臂", effect: { happiness: 15, health: 5, stress: -10, network: 8 }, log: "这一晚的声音彻底释放了所有的积压情绪，极其痛快！" },
      { text: "拉着暗恋很久的对象悄悄去看操场看台上的星空", effect: { love: 20, happiness: 12, wealth: -2 }, log: "夜风轻拂，你们的手悄悄握在了一起。" }
    ]
  },
  {
    title: "学生会部长换届选举",
    text: "部门大会上，上一届部长宣布了即将退任的消息，并问谁愿意接任新一届的部长职务。",
    choices: [
      { text: "勇敢站上讲台，发表热情洋溢的竞选演讲", effect: { network: 15, stress: 8, happiness: 4 }, log: "全场高票通过，你成为了新一届部门主理人。" },
      { text: "鼓掌支持朋友，自己退居二线当顾问", effect: { happiness: 8, stress: -4, network: 5 }, log: "既保持了友谊，又摆脱了繁琐的事务。" }
    ]
  }
];

const LIFE_SLACK_EVENTS = [
  {
    title: "双十一零点赛博抢购",
    text: "零点的钟声即将敲响，购物车里装满了机械键盘、人体工学椅与各种零食食品。",
    choices: [
      { text: "准时清空购物车，享受疯狂消费的快感", effect: { wealth: -15, happiness: 15, health: 4 }, log: "买到了心仪已久的神仙装备，幸福感爆棚！" },
      { text: "关掉手机直接睡觉：‘不买立省百分之百’", effect: { wealth: 10, stress: -5, happiness: 2 }, log: "守护住了可怜的钱包，清晨神清气爽。" }
    ]
  },
  {
    title: "宿舍猫咪救援行动",
    text: "宿舍楼底下有一只被困在树枝上的三花小猫，正在弱弱地喵喵叫，吸引了一群同学围观。",
    choices: [
      { text: "借来长梯亲自爬上去将小猫安全救下", effect: { happiness: 12, health: 5, network: 10 }, log: "全楼同学为你鼓掌，你成为了今日校园英雄！" },
      { text: "拿出猫条在树下温柔地引诱它自己跳下来", effect: { happiness: 10, love: 6, wealth: -2 }, log: "小猫跳进了你的怀里，你从此拥有了专属撸猫权。" }
    ]
  }
];

const ALL_DYNAMIC_POOL = [
  ...ACADEMIC_EVENTS,
  ...TECH_EVENTS,
  ...SOCIAL_LOVE_EVENTS,
  ...LIFE_SLACK_EVENTS
];

export function generateProceduralEvent(year, term, index) {
  const template = ALL_DYNAMIC_POOL[Math.floor(Math.random() * ALL_DYNAMIC_POOL.length)];
  const randomizedId = `proc_${year}_${term}_${index}_${Math.floor(Math.random() * 10000)}`;

  return {
    id: randomizedId,
    year,
    term,
    isDynamic: true,
    title: template.title,
    text: template.text,
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
