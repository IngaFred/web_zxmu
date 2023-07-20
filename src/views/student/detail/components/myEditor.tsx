import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
// 导入工具栏配置类型IToolbarConfig，菜单配置类型IEditorConfig
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
// DomEditor.getToolbar(editor) 获取 toolbar 实例
import { DomEditor } from "@wangeditor/editor";
// 导入预设的Html内联样式
import styles from "../components/editorStyles/view.module.scss";
//导入图片类型
import { SlateElement } from "@wangeditor/editor";
import { message } from "antd";
// post import
import { postUploadImage, postUploadVideo } from "../../../../service/detail";

function MyEditor() {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法
  // 编辑器初始内容
  const [html, setHtml] = useState("");

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    /* 工具栏配置 */
    /* 显示哪些菜单，如何排序、分组 */
    // toolbarKeys: [
    // ],
    /* 隐藏哪些菜单 */
    // excludeKeys: [
    // ],
  };
  // 当前菜单排序和分组
  const toolbar = editor ? DomEditor.getToolbar(editor) : null;
  const curToolbarConfig = toolbar?.getConfig();
  // 输出出现有的工具栏列表key值
  // //console.log(curToolbarConfig?.toolbarKeys ?? 'noEditor');

  // 初始化编辑器配置
  // 初始化 MENU_CONF 属性
  // 类型是IEditorConfig类型的部分子集，也就是说它可以省略一些IEditorConfig类型的属性
  const editorConfig: Partial<IEditorConfig> = {
    // 编辑器配置，如 placeholder onChange ...
    // 所有的菜单配置，都要在 MENU_CONF 属性下
    MENU_CONF: {
      // Image upload
      uploadImage: {
        // server: 'https://zcmu.vxpage.top/resource/upload',
        // // 自定义增加 http  header
        // headers: {
        // 	Authorization: token,
        // },
        // 自定义上传参数，参数会被添加到 formData 中
        // meta: {
        // 	resourceFile: myFile,
        // },
        // 插入 base64 格式 1000kb
        base64LimitSize: 1000 * 1024,
        fieldName: "myImage",
        // 单个文件的最大体积限制，默认为 2M
        maxFileSize: 2000 * 1024 * 1024, // 2000M
        // 最多可上传几个文件，默认为 100
        maxNumberOfFiles: 1,
        // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
        allowedFileTypes: ["image/*"],
        // 上传之前触发
        onBeforeUpload(file: File) {
          return file;
          // 1. return file 或者 new 一个 file ，接下来将上传
          // 2. return false ，不上传这个 file
        },
        // 上传进度的回调函数
        onProgress(progress: number) {
          //console.log('progress 进度', progress);
        },
        // 单个文件上传成功之后
        onSuccess(file: File, res: any) {
          //console.log(`${file.name} 上传成功`, res);
        },
        // 单个文件上传失败
        onFailed(file: File, res: any) {
          //console.log(`${file.name} 上传失败`, res);
        },
        // 上传错误，或者触发 timeout 超时
        onError(file: File, err: any, res: any) {
          //console.log(`${file.name} 上传出错`, err, res);
        },
        // 自定义上传
        async customUpload(file: File, insertFn: any) {
          // file 即选中的文件
          postUploadImage(file).then((ret) => {
            // 自己实现上传，并得到图片 url alt href
            const { success, data, errorMsg } = ret?.data || null;
            if (success) {
              message.success(errorMsg);
              const url = data?.url;
              // 最后插入图片
              insertFn(url);
              // 修改默认图片上传样式
              // const node = {type: "image",url,style: { width: "100%" }, children: [{ text: "" }],};
              // editor? editor.insertNode(node) : //console.log('image error');
            }
          });
        },
      },
      uploadVideo: {
        fieldName: "myVideo",
        // 单个文件的最大体积限制，默认为 10M
        maxFileSize: 10 * 1024 * 1024,
        // 最多可上传几个文件，默认为 5
        maxNumberOfFiles: 5,
        // 选择文件时的类型限制，默认为 ['video/*'] 。如不想限制，则设置为 []
        allowedFileTypes: ["video/*"],
        // 将 meta 拼接到 url 参数中，默认 false
        metaWithUrl: false,
        // 跨域是否传递 cookie ，默认为 false
        withCredentials: false,
        // 超时时间，默认为 30 秒
        timeout: 15 * 1000, // 15 秒
        // 视频不支持 base64 格式插入
        // 上传之前触发
        onBeforeUpload(file: File) {
          return file;
        },
        // 上传进度的回调函数
        onProgress(progress: number) {
          //console.log('progressVideo', progress);
        },
        // 单个文件上传成功之后
        onSuccess(file: File, res: any) {
          //console.log(`${file.name} 上传成功`, res);
        },
        // 单个文件上传失败
        onFailed(file: File, res: any) {
          //console.log(`${file.name} 上传失败`, res);
        },
        // 上传错误，或者触发 timeout 超时
        onError(file: File, err: any, res: any) {
          //console.log(`${file.name} 上传出错`, err, res);
        },
        // 自定义上传
        async customUpload(file: File, insertFn: any) {
          // file 即选中的文件
          postUploadVideo(file).then((ret) => {
            // 自己实现上传，并得到图片 url alt href
            const { success, data, errorMsg } = ret?.data || null;
            if (success) {
              message.success(errorMsg);
              const url = data?.url;
              // 最后插入图片
              insertFn(url);
              // 修改默认图片上传样式
              // const node = {type: "image",url,style: { width: "100%" }, children: [{ text: "" }],};
              // editor? editor.insertNode(node) : //console.log('image error');
            }
          });
        },
      },
      // codeLangs 配置代码语言 代码高亮
      codeSelectLang: {
        // 代码语言
        // codeLangs: [
        // 	{ text: 'CSS', value: 'css' },
        // 	{ text: 'HTML', value: 'html' },
        // 	{ text: 'XML', value: 'xml' },
        // 	{ text: 'SQL', value: 'sql' },
        // 	{ text: 'JAVA', value: 'java' },
        // 	{ text: 'Python', value: 'python' },
        // 	{ text: 'Javascript', value: 'javascript' },
        // 	{ text: 'C', value: 'c' },
        // 	{ text: 'C#', value: 'c#' },
        // ],
      },
    },
  };

  // 自定义粘贴
  const customPaste = (editor: IDomEditor, event: any) => {
    // 实现复制的文字粘贴至富文本
    const html = event.clipboardData.getData("text/html"); // 获取粘贴的 html
    const text = event.clipboardData.getData("text/plain"); // 获取粘贴的 text
    const rtf = event.clipboardData.getData("text/trf"); // 获取粘贴的rtf

    // 插入复制的文本
    editor.insertText(text);
    editor.insertText(rtf);

    event.preventDefault();

    return true; // true 允许粘贴行为
  };

  // 上传图片配置
  // 自定义校验图片
  function customCheckImageFn(
    src: string,
    alt: string,
    url: string
  ): boolean | undefined | string {
    if (!src) {
      return;
    }
    if (src.indexOf("http") !== 0) {
      return "图片网址必须以 http/https 开头";
    }
    return true;
    // 返回值有三种选择：
    // 1. 返回 true ，说明检查通过，编辑器将正常插入图片
    // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
    // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
  }
  // 转换图片链接
  function customParseImageSrc(src: string): string {
    if (src.indexOf("https") !== 0) {
      return `https://${src}`;
    }
    return src;
  }

  editorConfig.placeholder = "请输入内容...";

  // 编辑器创建完毕时的回调函数
  editorConfig.onCreated = (editor: IDomEditor) => {};

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: "400px", overflowY: "hidden" }}
        />
      </div>
    </>
  );
}

export default MyEditor;
