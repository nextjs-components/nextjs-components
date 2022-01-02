import dynamic from "next/dynamic";

import type {
  ModalProps,
  BodyProps,
  HeaderProps,
  TitleProps,
  SubtitleProps,
  ActionsProps,
  ActionProps,
} from "./Modal";

/**
 * @warn dynamic import seems to break Focus trapping, on mount.
 */
const _Modal = dynamic<ModalProps>(() =>
  import("./Modal").then((mod) => mod.Modal)
);
const Body = dynamic<BodyProps>(() =>
  import("./Modal").then((mod) => mod.Body)
);
const Header = dynamic<HeaderProps>(() =>
  import("./Modal").then((mod) => mod.Header)
);
const Title = dynamic<TitleProps>(() =>
  import("./Modal").then((mod) => mod.Title)
);
const Subtitle = dynamic<SubtitleProps>(() =>
  import("./Modal").then((mod) => mod.Subtitle)
);
const Actions = dynamic<ActionsProps>(() =>
  import("./Modal").then((mod) => mod.Actions)
);
const Action = dynamic<ActionProps>(() =>
  import("./Modal").then((mod) => mod.Action)
);

// import {
//   Modal as _Modal,
//   Body,
//   Header,
//   Title,
//   Subtitle,
//   Actions,
//   Action,
// } from "./Modal";

export const Modal = {
  Modal: _Modal,
  Body: Body,
  Header: Header,
  Title: Title,
  Subtitle: Subtitle,
  Actions: Actions,
  Action: Action,
};
