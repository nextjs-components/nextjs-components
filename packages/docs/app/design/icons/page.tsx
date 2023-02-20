"use client";

import { MDXProvider } from "@mdx-js/react";
import { Container, Spacer, Text } from "nextjs-components";
import { Input } from "nextjs-components/src/components/Input";
import * as Icons from "nextjs-components/src/icons";
import Search from "nextjs-components/src/icons/Search";

import { mdxComponents } from "../../../mdx-components";
import styles from "../design.module.css";
import IconsMdx from "./icons.mdx";
import { ListItem } from "./list";
import listStyles from "./list.module.css";

const map = {
  activity: null,
  airplay: null,
  "alert-circle": Icons.AlertCircle,
  "alert-circle-fille": null,
  "alert-octagon": null,
  "alert-triangle": Icons.AlertTriangle,
  "alert-triangle-fill": null,
  "align-center": Icons.AlignCenter,
  "align-justify": null,
  "align-left": Icons.AlignLeft,
  "align-right": Icons.AlignRight,
  anchor: null,
  aperture: null,
  archive: null,
  "arrow-down": null,
  "arrow-down-circle": Icons.ArrowDownCircle,
  "arrow-down-circle-fill": null,
  "arrow-down-left": null,
  "arrow-down-right": null,
  "arrow-left": null,
  "arrow-left-circle": null,
  "arrow-right": Icons.ArrowRight,
  "arrow-right-circle": null,
  "arrow-right-circle-fill": null,
  "arrow-up": Icons.ArrowUp,
  "arrow-up-circle": Icons.ArrowUpCircle,
  "arrow-up-left": null,
  "arrow-up-right": null,
  "at-sign": null,
  award: null,
  "bar-chart": null,
  "bar-chart-2": null,
  battery: null,
  "battery-charging": null,
  bell: null,
  "bell-off": null,
  bluetooth: null,
  bold: null,
  book: null,
  "book-open": null,
  bookmark: null,
  box: null,
  "box-with-ring": null,
  branch: null,
  briefcase: null,
  calendar: Icons.Calendar,
  camera: null,
  "camera-off": null,
  cast: null,
  check: null,
  "check-circle": null,
  "check-in-circle": Icons.CheckInCircle,
  "check-in-circle-fill": null,
  "check-in-circle-dashed": null,
  "check-in-square": null,
  checkbox: null,
  "checkbox-fill": null,
  "chevron-down": Icons.ChevronDown,
  "chevron-down-circle": null,
  "chevron-down-circle-fill": null,
  "chevron-left": null,
  "chevron-left-circle": null,
  "chevron-left-circle-fill": null,
  "chevron-right": null,
  "chevron-right-circle": null,
  "chevron-right-circle-fill": null,
  "chevron-up": null,
  "chevron-up-circle": null,
  "chevron-up-circle-fill": null,
  "chevron-up-down": Icons.ChevronUpDown,
  "chevrons-down": null,
  "chevrons-left": null,
  "chevrons-right": null,
  "chevrons-up": null,
  chrome: null,
  circle: null,
  "circle-fill": null,
  clipboard: null,
  clock: null,
  cloud: null,
  "cloud-drizzle": null,
  "cloud-lightning": null,
  "cloud-off": null,
  "cloud-rain": null,
  "cloud-snow": null,
  code: null,
  codepen: null,
  codesandbox: null,
  coffee: Icons.CoffeeIcon,
  columns: null,
  command: null,
  compass: null,
  copy: Icons.CopyIcon,
  "corner-down-left": null,
  "corner-down-right": null,
  "corner-left-down": null,
  "corner-left-up": null,
  "corner-right-down": null,
  "corner-right-up": null,
  "corner-up-left": null,
  "corner-up-right": null,
  cpu: null,
  "credit-card": null,
  crop: null,
  crosshair: null,
  cursor: null,
  database: null,
  delete: Icons.DeleteIcon,
  disc: null,
  display: Icons.DisplayIcon,
  divider: Icons.DividerIcon,
  "dollar-sign": null,
  download: null,
  "download-cloud": null,
  droplet: null,
  edge: null,
  "edge-config": null,
  "edge-config-detached": null,
  edit: null,
  edit2: Icons.Edit2Icon,
  edit3: null,
  emoji: null,
  "error-circle": null,
  "error-circle-fill": null,
  "external-link": Icons.ExternalLink,
  eye: null,
  "eye-off": null,
  facebook: null,
  "fast-forward": null,
  feather: null,
  figma: null,
  file: null,
  "file-function": null,
  "file-function-fill": null,
  "file-lambda": null,
  "file-lambda-fill": null,
  "file-minus": null,
  "file-plus": null,
  "file-text": null,
  film: null,
  filter: null,
  flag: null,
  folder: null,
  "folder-minus": null,
  "folder-open": null,
  "folder-plus": null,
  framer: null,
  frown: null,
  "full-screen": null,
  "full-screen-close": null,
  function: null,
  geist: null,
  gift: null,
  "git-branch": null,
  "git-commit": null,
  "git-merge": null,
  "git-pull-request": null,
  github: Icons.GitHub,
  gitlab: null,
  globe: null,
  grid: null,
  "hard-drive": null,
  hash: null,
  headphones: null,
  heart: Icons.HeartIcon,
  "heart-fill": null,
  "help-circle": null,
  hexagon: null,
  home: null,
  image: Icons.ImageIcon,
  inbox: null,
  "infinity-icon": null,
  info: Icons.Info,
  "info-fill": null,
  instagram: null,
  italic: null,
  key: null,
  lambda: null,
  layers: null,
  layout: null,
  "life-buoy": null,
  list: null,
  loader: null,
  lock: null,
  "log-in": null,
  "log-out": null,
  mail: null,
  map: null,
  "map-pin": null,
  maximize: null,
  maximize2: null,
  meh: null,
  menu: Icons.MenuIcon,
  "message-circle": null,
  "message-square": null,
  mic: null,
  "mic-off": null,
  middleware: null,
  minimize: null,
  minimize2: null,
  minus: null,
  "minus-circle": null,
  "minus-square": null,
  monitor: null,
  moon: null,
  "more-horizontal": Icons.MoreHorizontal,
  "more-vertical": Icons.MoreVertical,
  "mouse-pointer": null,
  move: null,
  music: null,
  navigation: null,
  navigation2: null,
  octagon: null,
  package: null,
  paperclip: null,
  pause: null,
  "pause-fill": null,
  "pause-circle": null,
  "pen-tool": null,
  percent: null,
  phone: null,
  "phone-call": null,
  "phone-forwarded": null,
  "phone-incoming": null,
  "phone-missed": null,
  "phone-off": null,
  "phone-outgoing": null,
  "pie-chart": null,
  pin: null,
  play: null,
  "play-fill": null,
  "play-circle": null,
  "play-solid": null,
  "play-solid-fill": null,
  plus: null,
  "plus-circle": null,
  "plus-square": null,
  pocket: null,
  power: null,
  printer: null,
  "question-circle": null,
  radio: null,
  "refresh-ccw": null,
  "refresh-cw": null,
  repeat: null,
  rewind: null,
  "rotate-ccw": null,
  "rotate-cw": Icons.RotateCW,
  rss: null,
  save: null,
  scissors: null,
  search: Icons.Search,
  send: null,
  server: null,
  serverless: null,
  settings: null,
  share: null,
  share2: null,
  shield: null,
  "shield-off": null,
  "shopping-bag": null,
  "shopping-cart": null,
  shuffle: null,
  sidebar: null,
  "skip-back": null,
  "skip-forward": null,
  slack: null,
  slash: null,
  sliders: null,
  smartphone: null,
  smile: null,
  sort: null,
  speaker: null,
  square: null,
  star: null,
  static: null,
  "stop-circle": null,
  sun: Icons.Sun,
  sunrise: null,
  sunset: null,
  tablet: null,
  tag: Icons.Tag,
  target: null,
  terminal: null,
  thermometer: null,
  "thumbs-down": Icons.ThumbsDown,
  "thumbs-up": Icons.ThumbsUp,
  "toggle-left": null,
  "toggle-right": null,
  tool: null,
  trash: null,
  trash2: null,
  trello: null,
  "trending-down": null,
  "trending-up": null,
  triangle: null,
  truck: null,
  tv: null,
  twitch: null,
  twitter: null,
  type: null,
  umbrella: null,
  underline: null,
  unlock: null,
  upload: null,
  "upload-cloud": null,
  user: Icons.UserIcon,
  "user-check": null,
  "user-minus": null,
  "user-plus": null,
  "user-x": null,
  users: null,
  "vercel-triangle": null,
  "vercel-triangle-filled": null,
  video: null,
  "video-off": null,
  voicemail: null,
  volume: null,
  volume1: null,
  volume2: null,
  "volume-x": null,
  watch: null,
  wifi: null,
  "wifi-off": null,
  wind: null,
  x: Icons.XIcon,
  "x-circle": Icons.XCircle,
  "x-circle-fill": null,
  "x-octagon": null,
  "x-square": null,
  youtube: null,
  zap: null,
  "zap-off": null,
  "zero-config": null,
  "zoom-in": null,
  "zoom-out": null,
};

const total = Object.keys(map).length;
const present = Object.keys(map).filter((key) => map[key]).length;

export default function Slug({ params: { slug } }) {
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
          prefix={<Search size={16} color="var(--themed-border)" />}
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
