// ============================================================
// リンクのデータ。このファイルだけ編集すれば内容が変わります。
// GitHub上で直接編集 → コミット でそのまま公開されます。
//
// 【項目の書き方】
//   title : 表示名(必須)
//   url   : リンク先。"" (空)にすると「準備中」表示になる
//   desc  : 説明文
//   tags  : タグ。上の絞り込みボタンは、ここに書いた分だけ自動で増える
//   image : images/ に入れた画像のファイル名。または画像のURL。
//           "" (空)なら、タイトルに応じたらくがき模様が自動で描かれる
//   color : そのカードだけの色。"" (空)なら共通色。例: "#96b380"
//
// 【追加するとき】
//   下の { ... }, をまるごとコピーして貼り付け、中身を書き換える。
//   カンマ , の付け忘れに注意。並び順がそのまま表示順です。
// ============================================================

const SITE_CONFIG = {
  title: "つくったものまとめ",
  subtitle: "つくったものをここにまとめてます"
};

const SITES = [
  {
    title: "けしかす集中",
    url: "https://ayatonikuman.github.io/keshikasu/",
    desc: "シャーペンと消しゴムと一緒に勉強する集中アプリ。ご褒美は消しカス練り。",
    tags: ["集中アプリ"],
    image: "",
    color: ""
  },
  {
    title: "スマホと移動を同時にこなせ！歩きスマホゲーム",
    url: "https://ayatonikuman.github.io/arukisumaho/",
    desc: "歩行とスマホ操作の2タスク同時処理アクション。",
    tags: ["ゲーム"],
    image: "",
    color: ""
  },
  {
    title: "SNS依存",
    url: "https://ayatonikuman.github.io/SNS/",
    desc: "",
    tags: ["ゲーム"],
    image: "",
    color: ""
  },
  {
    title: "敵がすっごい避けてくるゲーム、死ぬのがムズい",
    url: "https://ayatonikuman.github.io/sontaku/",
    desc: "こちらに忖度してくる敵。攻めると当たってくれるアクション。",
    tags: ["ゲーム"],
    image: "",
    color: ""
  },
  {
    title: "短歌をつくる",
    url: "https://ayatonikuman.github.io/tanka/",
    desc: "短歌を詠んで書き留める「詠み帖」。",
    tags: ["ツール"],
    image: "",
    color: ""
  },
  {
    title: "構図",
    url: "https://ayatonikuman.github.io/kouzulab/",
    desc: "イラストの構図決め専用のブラウザ3Dツール。パース線・人型モデル付き。",
    tags: ["ツール", "イラスト"],
    image: "",
    color: ""
  },
  {
    title: "化石発掘",
    url: "https://ayatonikuman.github.io/excavationgame/",
    desc: "地層を掘って化石を発掘するパズルゲーム。",
    tags: ["ゲーム"],
    image: "",
    color: ""
  },
  {
    title: "微生物",
    url: "https://ayatonikuman.github.io/microorganismsneba/",
    desc: "単細胞ソフトボディ物理の探索ゲーム。図鑑あり。",
    tags: ["ゲーム"],
    image: "",
    color: ""
  },
  {
    title: "育てる集中アプリ",
    url: "https://ayatonikuman.github.io/focusgarden/",
    desc: "集中した時間だけ植物とカラクリが育つ集中アプリ。",
    tags: ["集中アプリ"],
    image: "",
    color: ""
  },
  {
    title: "惑星迷路",
    url: "https://ayatonikuman.github.io/wakuseimeiro/",
    desc: "小さな星の上をころがって進む迷路。",
    tags: ["ゲーム"],
    image: "",
    color: ""
  },
  {
    title: "ヤギのナンプレ",
    url: "https://ayatonikuman.github.io/yagisudoku/",
    desc: "数字は岩の高さ。ヤギは一番高い隣へ跳び、全員を別々の旗へ。",
    tags: ["ゲーム"],
    image: "",
    color: ""
  },
  {
    title: "二重振り子",
    url: "https://ayatonikuman.github.io/furiko/",
    desc: "二重振り子を振り出して飛距離を競う。決められるのは開始姿勢だけ。",
    tags: ["ゲーム"],
    image: "",
    color: ""
  },
  {
    title: "徒労 -TOROU-",
    url: "https://ayatonikuman.github.io/dopagaki1/",
    desc: "終わりのない落下をただ並走する。死なないし、説明もない。",
    tags: ["ゲーム"],
    image: "",
    color: ""
  },
  {
    title: "桁 -KETA-",
    url: "https://ayatonikuman.github.io/dopagaki2/",
    desc: "数字の桁が壊れていく縦スクロールシューティング。",
    tags: ["ゲーム"],
    image: "",
    color: ""
  },
  {
    title: "粒子場",
    url: "https://ayatonikuman.github.io/dopagaki3/",
    desc: "カメラ映像の上を漂う粒が、近づいた体に反応して散る。",
    tags: ["ビジュアル"],
    image: "",
    color: ""
  },
  {
    title: "車窓ラン",
    url: "https://ayatonikuman.github.io/shasourun/",
    desc: "カメラに映った景色の稜線を地形にして、キャラが跳ねて走る。",
    tags: ["ゲーム"],
    image: "",
    color: ""
  },
  {
    title: "アリの運び屋",
    url: "https://ayatonikuman.github.io/arisan/",
    desc: "選んだ画像を、アリの群れが少しずつ巣へ運び去る。",
    tags: ["ビジュアル"],
    image: "",
    color: ""
  },
  {
    title: "音響リアクター",
    url: "",
    desc: "音とタッチに反応するビジュアライザー。3シーン切り替え。",
    tags: ["ツール", "ビジュアル"],
    image: "",
    color: ""
  }

  // ↓ 追加するときはこれを使う(上の行の末尾に , を付けてから貼る)
  // ,{
  //   title: "",
  //   url: "",
  //   desc: "",
  //   tags: [""],
  //   image: "",
  //   color: ""
  // }
];
