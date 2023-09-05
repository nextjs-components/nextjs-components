"use client";

import React from "react";

import { useIconSize } from "../contexts/IconSizeContext";
import { Props } from "./props";

export default function EdgeConfig({
  color = "currentcolor",
  size,
  ...props
}: Props) {
  const iconSize = useIconSize();
  return (
    <svg
      {...props}
      fill="none"
      height={size || iconSize.size}
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      viewBox="0 0 60 60"
      width={size || iconSize.size}
      style={{ ...props.style, color }}
    >
      <path
        d="M23.7914 16.5276C34.1696 16.5276 42.5828 13.7232 42.5828 10.2638C42.5828 6.8044 34.1696 4 23.7914 4C13.4132 4 5 6.8044 5 10.2638C5 13.7232 13.4132 16.5276 23.7914 16.5276Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M23.7914 31.1432C13.3517 31.1432 5 28.3454 5 24.8794"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M5 10.2638V39.4949C5 42.9609 13.3517 45.7587 23.7914 45.7587M42.5828 22.5V10.2638"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <circle cx="38.7637" cy="38.55" r="16.25" strokeWidth="2"></circle>
      <path
        d="M29.505 38.3955V37.5033C30.017 37.5033 30.3721 37.4012 30.5703 37.197C30.7686 36.9928 30.8678 36.6629 30.8678 36.2072V35.2262C30.8678 34.6787 30.9432 34.2407 31.0941 33.9122C31.248 33.5808 31.4611 33.3307 31.7333 33.1621C32.0086 32.9934 32.3341 32.8809 32.7099 32.8247C33.0857 32.7685 33.4971 32.7404 33.9439 32.7404V34.1519C33.5947 34.1519 33.3284 34.1978 33.1449 34.2895C32.9644 34.3783 32.8416 34.5174 32.7765 34.7068C32.7114 34.8932 32.6788 35.13 32.6788 35.417V36.7132C32.6788 36.9381 32.6374 37.1526 32.5545 37.3568C32.4717 37.5581 32.3178 37.7371 32.0929 37.8939C31.868 38.0478 31.5469 38.1706 31.1296 38.2624C30.7124 38.3512 30.1708 38.3955 29.505 38.3955ZM33.9439 43.9753C33.4971 43.9753 33.0857 43.9472 32.7099 43.8909C32.3341 43.8347 32.0086 43.7222 31.7333 43.5536C31.4611 43.3849 31.248 43.1348 31.0941 42.8034C30.9432 42.4749 30.8678 42.0369 30.8678 41.4895V40.504C30.8678 40.0483 30.7686 39.7183 30.5703 39.5141C30.3721 39.31 30.017 39.2079 29.505 39.2079V38.3156C30.1708 38.3156 30.7124 38.3615 31.1296 38.4532C31.5469 38.542 31.868 38.6648 32.0929 38.8217C32.3178 38.9756 32.4717 39.1546 32.5545 39.3588C32.6374 39.56 32.6788 39.7746 32.6788 40.0024V41.2986C32.6788 41.5827 32.7114 41.8179 32.7765 42.0044C32.8416 42.1938 32.9644 42.3329 33.1449 42.4216C33.3284 42.5134 33.5947 42.5592 33.9439 42.5592V43.9753ZM29.505 39.2079V37.5033H31.0986V39.2079H29.505Z"
        fill="currentColor"
      ></path>
      <path
        d="M39.9177 40.757L39.8689 41.2453C39.8304 41.636 39.7564 42.0251 39.6469 42.4128C39.5404 42.8034 39.4279 43.157 39.3096 43.4737C39.1942 43.7903 39.1009 44.0389 39.0299 44.2194H37.8048C37.8492 44.0448 37.9098 43.8007 37.9868 43.487C38.0637 43.1763 38.1362 42.8271 38.2043 42.4394C38.2723 42.0517 38.3153 41.6567 38.333 41.2542L38.3552 40.757H39.9177ZM39.1276 37.3391C38.8346 37.3391 38.5831 37.2355 38.373 37.0284C38.1658 36.8212 38.0622 36.5697 38.0622 36.2737C38.0622 35.9837 38.1658 35.7366 38.373 35.5324C38.5831 35.3253 38.8346 35.2217 39.1276 35.2217C39.4117 35.2217 39.6602 35.3253 39.8733 35.5324C40.0864 35.7366 40.1929 35.9837 40.1929 36.2737C40.1929 36.472 40.1426 36.6525 40.042 36.8153C39.9443 36.9751 39.8156 37.1023 39.6558 37.197C39.496 37.2917 39.3199 37.3391 39.1276 37.3391Z"
        fill="currentColor"
      ></path>
      <path
        d="M48.4938 38.3156V39.2079C47.9848 39.2079 47.6297 39.31 47.4285 39.5141C47.2302 39.7183 47.1311 40.0483 47.1311 40.504V41.4895C47.1311 42.0369 47.0541 42.4749 46.9002 42.8034C46.7493 43.1348 46.5362 43.3849 46.261 43.5536C45.9888 43.7222 45.6647 43.8347 45.2889 43.8909C44.916 43.9472 44.5047 43.9753 44.0549 43.9753V42.5592C44.4041 42.5592 44.6689 42.5134 44.8494 42.4216C45.0329 42.3329 45.1572 42.1938 45.2223 42.0044C45.2874 41.8179 45.32 41.5827 45.32 41.2986V40.0024C45.32 39.7746 45.3614 39.56 45.4443 39.3588C45.5271 39.1546 45.681 38.9756 45.9059 38.8217C46.1308 38.6648 46.4519 38.542 46.8692 38.4532C47.2864 38.3615 47.828 38.3156 48.4938 38.3156ZM44.0549 32.7404C44.5047 32.7404 44.916 32.7685 45.2889 32.8247C45.6647 32.8809 45.9888 32.9934 46.261 33.1621C46.5362 33.3307 46.7493 33.5808 46.9002 33.9122C47.0541 34.2407 47.1311 34.6787 47.1311 35.2262V36.2072C47.1311 36.6629 47.2302 36.9928 47.4285 37.197C47.6297 37.4012 47.9848 37.5033 48.4938 37.5033V38.3955C47.828 38.3955 47.2864 38.3512 46.8692 38.2624C46.4519 38.1706 46.1308 38.0478 45.9059 37.8939C45.681 37.7371 45.5271 37.5581 45.4443 37.3568C45.3614 37.1526 45.32 36.9381 45.32 36.7132V35.417C45.32 35.13 45.2874 34.8932 45.2223 34.7068C45.1572 34.5174 45.0329 34.3783 44.8494 34.2895C44.6689 34.1978 44.4041 34.1519 44.0549 34.1519V32.7404ZM48.4938 37.5033V39.2079H46.9002V37.5033H48.4938Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}
