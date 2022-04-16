import React from "react";
import TimeAgo from "timeago-react";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import MathJax from "react-mathjax";
// @ts-ignore
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.css";
interface IProps {
  username?: string;
  contect: string;
  timeago?: number;
  joined?: string;
  likes?: 0;
  comments?: 0;
  photo?: string;
  title?: string;
}
export default function PostList(props: IProps) {
  const _mapProps = (props: any) => ({
    ...props,
    escapeHtml: false,
    plugins: [remarkMath],
    renderers: {
      ...props.renderers,
      math: (value: any) => <BlockMath>{value}</BlockMath>,
      inlineMath: (value: any) => <InlineMath>{value}</InlineMath>,
    },
  });

  return (
    <>
      <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-5 max-w-md md:max-w-2xl ">
        {" "}
        <div className="flex items-start px-4 py-6">
          <div className="">
            <div className="flex items-center justify-between">
              <h2 className="text-md font-semibold text-gray-900 -mt-1">
                {props.title}{" "}
                <span className="text-sm">by {props.username} </span>
              </h2>
              <small className="text-sm text-gray-700">
                {<TimeAgo datetime={`${props.timeago}`} />}
              </small>
            </div>
            <MathJax.Provider>
              <ReactMarkdown
                {..._mapProps(props)}
                children={props.contect}
                rehypePlugins={[rehypeKatex]}
                remarkPlugins={[remarkGfm, rehypeHighlight, remarkMath]}
              />
            </MathJax.Provider>

            <div className="mt-4 flex items-center">
              <div className="flex mr-2 text-gray-700 text-sm mr-3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
