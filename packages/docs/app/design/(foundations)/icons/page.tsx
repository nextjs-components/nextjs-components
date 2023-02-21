"use client";

import { MDXProvider } from "@mdx-js/react";
import { Container, Spacer, Text } from "nextjs-components";
import { Input } from "nextjs-components/src/components/Input";
import * as Icons from "nextjs-components/src/icons";

import { mdxComponents } from "@/mdx-components";

import styles from "../../design.module.css";
import IconsMdx from "./icons.mdx";
import { ListItem } from "./list";
import listStyles from "./list.module.css";

const map = {
  activity: Icons.Activity,
  airplay: Icons.Airplay,
  "alert-circle": Icons.AlertCircle,
  "alert-circle-fill": Icons.AlertCircleFill,
  "alert-octagon": Icons.AlertOctagon,
  "alert-triangle": Icons.AlertTriangle,
  "alert-triangle-fill": Icons.AlertTriangleFill,
  "align-center": Icons.AlignCenter,
  "align-justify": Icons.AlignJustify,
  "align-left": Icons.AlignLeft,
  "align-right": Icons.AlignRight,
  anchor: Icons.Anchor,
  aperture: Icons.Aperture,
  archive: Icons.Archive,
  "arrow-down": Icons.ArrowDown,
  "arrow-down-circle": Icons.ArrowDownCircle,
  "arrow-down-circle-fill": Icons.ArrowDownCircleFill,
  "arrow-down-left": Icons.ArrowDownLeft,
  "arrow-down-right": Icons.ArrowDownRight,
  "arrow-left": Icons.ArrowLeft,
  "arrow-left-circle": Icons.ArrowLeftCircle,
  "arrow-right": Icons.ArrowRight,
  "arrow-right-circle": Icons.ArrowRightCircle,
  "arrow-right-circle-fill": Icons.ArrowRightCircleFill,
  "arrow-up": Icons.ArrowUp,
  "arrow-up-circle": Icons.ArrowUpCircle,
  "arrow-up-left": Icons.ArrowUpLeft,
  "arrow-up-right": Icons.ArrowUpRight,
  "at-sign": Icons.AtSign,
  award: Icons.Award,
  "bar-chart": Icons.BarChart,
  "bar-chart2": Icons.BarChart2,
  battery: Icons.Battery,
  "battery-charging": Icons.BatteryCharging,
  bell: Icons.Bell,
  "bell-off": Icons.BellOff,
  bluetooth: Icons.Bluetooth,
  bold: Icons.Bold,
  book: Icons.Book,
  "book-open": Icons.BookOpen,
  bookmark: Icons.Bookmark,
  box: Icons.Box,
  "box-with-ring": Icons.BoxWithRing,
  branch: Icons.Branch,
  briefcase: Icons.Briefcase,
  calendar: Icons.Calendar,
  camera: Icons.Camera,
  "camera-off": Icons.CameraOff,
  cast: Icons.Cast,
  check: Icons.Check,
  "check-circle": Icons.CheckCircle,
  "check-in-circle": Icons.CheckInCircle,
  "check-in-circle-fill": Icons.CheckInCircleFill,
  "check-in-dashed-circle": Icons.CheckInDashedCircle,
  "check-square": Icons.CheckSquare,
  checkbox: Icons.Checkbox,
  "checkbox-fill": Icons.CheckboxFill,
  "chevron-down": Icons.ChevronDown,
  "chevron-down-circle": Icons.ChevronDownCircle,
  "chevron-down-circle-fill": Icons.ChevronDownCircleFill,
  "chevron-left": Icons.ChevronLeft,
  "chevron-left-circle": Icons.ChevronLeftCircle,
  "chevron-left-circle-fill": Icons.ChevronLeftCircleFill,
  "chevron-right": Icons.ChevronRight,
  "chevron-right-circle": Icons.ChevronRightCircle,
  "chevron-right-circle-fill": Icons.ChevronRightCircleFill,
  "chevron-up": Icons.ChevronUp,
  "chevron-up-circle": Icons.ChevronUpCircle,
  "chevron-up-circle-fill": Icons.ChevronUpCircleFill,
  "chevron-up-down": Icons.ChevronUpDown,
  "chevrons-down": Icons.ChevronsDown,
  "chevrons-left": Icons.ChevronsLeft,
  "chevrons-right": Icons.ChevronsRight,
  "chevrons-up": Icons.ChevronsUp,
  chrome: Icons.Chrome,
  circle: Icons.Circle,
  "circle-fill": Icons.CircleFill,
  clipboard: Icons.Clipboard,
  clock: Icons.Clock,
  cloud: Icons.Cloud,
  "cloud-drizzle": Icons.CloudDrizzle,
  "cloud-lightning": Icons.CloudLightning,
  "cloud-off": Icons.CloudOff,
  "cloud-rain": Icons.CloudRain,
  "cloud-snow": Icons.CloudSnow,
  code: Icons.Code,
  codepen: Icons.Codepen,
  codesandbox: Icons.Codesandbox,
  coffee: Icons.Coffee,
  columns: Icons.Columns,
  command: Icons.Command,
  compass: Icons.Compass,
  copy: Icons.Copy,
  "corner-down-left": Icons.CornerDownLeft,
  "corner-down-right": Icons.CornerDownRight,
  "corner-left-down": Icons.CornerLeftDown,
  "corner-left-up": Icons.CornerLeftUp,
  "corner-right-down": Icons.CornerRightDown,
  "corner-right-up": Icons.CornerRightUp,
  "corner-up-left": Icons.CornerUpLeft,
  "corner-up-right": Icons.CornerUpRight,
  cpu: Icons.Cpu,
  "credit-card": Icons.CreditCard,
  crop: Icons.Crop,
  crosshair: Icons.Crosshair,
  cursor: Icons.Cursor,
  database: Icons.Database,
  delete: Icons.Delete,
  disc: Icons.Disc,
  display: Icons.Display,
  divider: Icons.Divider,
  "dollar-sign": Icons.DollarSign,
  download: Icons.Download,
  "download-cloud": Icons.DownloadCloud,
  droplet: Icons.Droplet,
  edge: Icons.Edge,
  "edge-config": Icons.EdgeConfig,
  "edge-config-detached": Icons.EdgeConfigDetached,
  edit: Icons.Edit,
  edit2: Icons.Edit2,
  edit3: Icons.Edit3,
  emoji: Icons.Emoji,
  "error-circle": Icons.ErrorCircle,
  "error-circle-fill": Icons.ErrorCircleFill,
  "external-link": Icons.ExternalLink,
  eye: Icons.Eye,
  "eye-off": Icons.EyeOff,
  facebook: Icons.Facebook,
  "fast-forward": Icons.FastForward,
  feather: Icons.Feather,
  figma: Icons.Figma,
  file: Icons.File,
  "file-function": Icons.FileFunction,
  "file-function-fill": Icons.FileFunctionFill,
  "file-lambda": Icons.FileLambda,
  "file-lambda-fill": Icons.FileLambdaFill,
  "file-minus": Icons.FileMinus,
  "file-plus": Icons.FilePlus,
  "file-text": Icons.FileText,
  film: Icons.Film,
  filter: Icons.Filter,
  flag: Icons.Flag,
  folder: Icons.Folder,
  "folder-minus": Icons.FolderMinus,
  "folder-open": Icons.FolderOpen,
  "folder-plus": Icons.FolderPlus,
  framer: Icons.Framer,
  frown: Icons.Frown,
  "full-screen": Icons.FullScreen,
  "full-screen-close": Icons.FullScreenClose,
  function: Icons.Function,
  geist: Icons.Geist,
  gift: Icons.Gift,
  "git-branch": Icons.GitBranch,
  "git-commit": Icons.GitCommit,
  "git-merge": Icons.GitMerge,
  "git-pull-request": Icons.GitPullRequest,
  github: Icons.Github,
  gitlab: Icons.Gitlab,
  globe: Icons.Globe,
  grid: Icons.Grid,
  "hard-drive": Icons.HardDrive,
  hash: Icons.Hash,
  headphones: Icons.Headphones,
  heart: Icons.Heart,
  "heart-fill": Icons.HeartFill,
  "help-circle": Icons.HelpCircle,
  hexagon: Icons.Hexagon,
  home: Icons.Home,
  image: Icons.Image,
  inbox: Icons.Inbox,
  "infinity-icon": Icons.InfinityIcon,
  info: Icons.Info,
  "info-fill": Icons.InfoFill,
  instagram: Icons.Instagram,
  italic: Icons.Italic,
  key: Icons.Key,
  lambda: Icons.Lambda,
  layers: Icons.Layers,
  layout: Icons.Layout,
  "life-buoy": Icons.LifeBuoy,
  "lightning-bolt": Icons.LightningBolt,
  link: Icons.Link,
  link2: Icons.Link2,
  linkedin: Icons.Linkedin,
  list: Icons.List,
  loader: Icons.Loader,
  lock: Icons.Lock,
  "log-in": Icons.LogIn,
  "log-out": Icons.LogOut,
  mail: Icons.Mail,
  map: Icons.Map,
  "map-pin": Icons.MapPin,
  maximize: Icons.Maximize,
  maximize2: Icons.Maximize2,
  meh: Icons.Meh,
  menu: Icons.Menu,
  "message-circle": Icons.MessageCircle,
  "message-square": Icons.MessageSquare,
  mic: Icons.Mic,
  "mic-off": Icons.MicOff,
  middleware: Icons.Middleware,
  minimize: Icons.Minimize,
  minimize2: Icons.Minimize2,
  minus: Icons.Minus,
  "minus-circle": Icons.MinusCircle,
  "minus-square": Icons.MinusSquare,
  monitor: Icons.Monitor,
  moon: Icons.Moon,
  "more-horizontal": Icons.MoreHorizontal,
  "more-vertical": Icons.MoreVertical,
  "mouse-pointer": Icons.MousePointer,
  move: Icons.Move,
  music: Icons.Music,
  navigation: Icons.Navigation,
  navigation2: Icons.Navigation2,
  octagon: Icons.Octagon,
  organization: Icons.Organization,
  package: Icons.Package,
  paperclip: Icons.Paperclip,
  pause: Icons.Pause,
  "pause-fill": Icons.PauseFill,
  "pause-circle": Icons.PauseCircle,
  "pen-tool": Icons.PenTool,
  percent: Icons.Percent,
  phone: Icons.Phone,
  "phone-call": Icons.PhoneCall,
  "phone-forwarded": Icons.PhoneForwarded,
  "phone-incoming": Icons.PhoneIncoming,
  "phone-missed": Icons.PhoneMissed,
  "phone-off": Icons.PhoneOff,
  "phone-outgoing": Icons.PhoneOutgoing,
  "pie-chart": Icons.PieChart,
  pin: Icons.Pin,
  play: Icons.Play,
  "play-fill": Icons.PlayFill,
  "play-circle": Icons.PlayCircle,
  "play-solid": Icons.PlaySolid,
  "play-solid-fill": Icons.PlaySolidFill,
  plus: Icons.Plus,
  "plus-circle": Icons.PlusCircle,
  "plus-square": Icons.PlusSquare,
  pocket: Icons.Pocket,
  power: Icons.Power,
  printer: Icons.Printer,
  "question-circle": Icons.QuestionCircle,
  radio: Icons.Radio,
  "refresh-ccw": Icons.RefreshCcw,
  "refresh-cw": Icons.RefreshCw,
  repeat: Icons.Repeat,
  rewind: Icons.Rewind,
  "rotate-ccw": Icons.RotateCcw,
  "rotate-cw": Icons.RotateCw,
  rss: Icons.Rss,
  save: Icons.Save,
  scissors: Icons.Scissors,
  search: Icons.Search,
  send: Icons.Send,
  server: Icons.Server,
  serverless: Icons.Serverless,
  settings: Icons.Settings,
  share: Icons.Share,
  share2: Icons.Share2,
  shield: Icons.Shield,
  "shield-off": Icons.ShieldOff,
  "shopping-bag": Icons.ShoppingBag,
  "shopping-cart": Icons.ShoppingCart,
  shuffle: Icons.Shuffle,
  sidebar: Icons.Sidebar,
  "skip-back": Icons.SkipBack,
  "skip-forward": Icons.SkipForward,
  slack: Icons.Slack,
  slash: Icons.Slash,
  sliders: Icons.Sliders,
  smartphone: Icons.Smartphone,
  smile: Icons.Smile,
  sort: Icons.Sort,
  speaker: Icons.Speaker,
  square: Icons.Square,
  star: Icons.Star,
  static: Icons.Static,
  "stop-circle": Icons.StopCircle,
  sun: Icons.Sun,
  sunrise: Icons.Sunrise,
  sunset: Icons.Sunset,
  tablet: Icons.Tablet,
  tag: Icons.Tag,
  target: Icons.Target,
  terminal: Icons.Terminal,
  thermometer: Icons.Thermometer,
  "thumbs-down": Icons.ThumbsDown,
  "thumbs-up": Icons.ThumbsUp,
  "toggle-left": Icons.ToggleLeft,
  "toggle-right": Icons.ToggleRight,
  tool: Icons.Tool,
  trash: Icons.Trash,
  trash2: Icons.Trash2,
  trello: Icons.Trello,
  "trending-down": Icons.TrendingDown,
  "trending-up": Icons.TrendingUp,
  triangle: Icons.Triangle,
  truck: Icons.Truck,
  tv: Icons.Tv,
  twitch: Icons.Twitch,
  twitter: Icons.Twitter,
  type: Icons.Type,
  umbrella: Icons.Umbrella,
  underline: Icons.Underline,
  unlock: Icons.Unlock,
  upload: Icons.Upload,
  "upload-cloud": Icons.UploadCloud,
  user: Icons.User,
  "user-check": Icons.UserCheck,
  "user-minus": Icons.UserMinus,
  "user-plus": Icons.UserPlus,
  "user-x": Icons.UserX,
  users: Icons.Users,
  "vercel-triangle": Icons.VercelTriangle,
  "vercel-triangle-filled": Icons.VercelTriangleFilled,
  video: Icons.Video,
  "video-off": Icons.VideoOff,
  voicemail: Icons.Voicemail,
  volume: Icons.Volume,
  volume1: Icons.Volume1,
  volume2: Icons.Volume2,
  "volume-x": Icons.VolumeX,
  watch: Icons.Watch,
  wifi: Icons.Wifi,
  "wifi-off": Icons.WifiOff,
  wind: Icons.Wind,
  x: Icons.X,
  "x-circle": Icons.XCircle,
  "x-circle-fill": Icons.XCircleFill,
  "x-octagon": Icons.XOctagon,
  "x-square": Icons.XSquare,
  youtube: Icons.Youtube,
  zap: Icons.Zap,
  "zap-off": Icons.ZapOff,
  "zero-config": Icons.ZeroConfig,
  "zoom-in": Icons.ZoomIn,
  "zoom-out": Icons.ZoomOut,
};

const total = Object.keys(map).length;
const present = Object.keys(map).filter((key) => map[key]).length;

export default function IconsPage() {
  return (
    <MDXProvider components={mdxComponents}>
      <IconsMdx total={total} present={present} />

      <div
        className={styles.module}
        style={{
          padding: 0,
          border: "none",
          marginTop: 30,
        }}
      >
        <Input
          prefix={<Icons.Search size={16} color="var(--themed-border)" />}
          prefixStyling={false}
          placeholder="Search icons..."
        />
        <Spacer />

        <div className="geist-list">
          {Object.entries(map).map(([key, Ic]) => {
            return (
              <ListItem key={key}>
                <button className="icon">
                  <Container center>
                    {Ic ? <Ic /> : <div style={{ height: 24 }} />}
                  </Container>
                  <Spacer />
                  <Container>
                    <Text as="small" color="geist-secondary">
                      {key}
                    </Text>
                  </Container>
                </button>
              </ListItem>
            );
          })}
        </div>

        <Spacer y={4} />

        <style jsx>{`
          .icon {
            --icon-color: var(--geist-secondary);
            transition: color 0.2s ease;

            color: var(--geist-foreground);
            width: 100%;
            height: 100%;
            margin: 0;
            background: var(--geist-background);
            padding: 0;
            border: none;
            user-select: none;
            cursor: pointer;
            border-radius: var(--geist-radius);
            transition: background-color.1s ease-in-out,
              box-shadow.1s ease-in-out;
          }
          .icon:hover {
            background-color: var(--hover);
          }
          .geist-list {
            display: flex;
            flex-wrap: wrap;
            margin: var(--geist-gap-half-negative);
            box-sizing: border-box;
          }
          .geist-list > :global(.${listStyles.geistListItem}) {
            padding: var(--geist-gap-half);
            flex-grow: 0;
            flex-basis: 25%;
            min-width: 0;
          }
        `}</style>
      </div>
    </MDXProvider>
  );
}
