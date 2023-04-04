import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import React, { useState, useEffect } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
// 导入工具栏配置类型IToolbarConfig，菜单配置类型IEditorConfig
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
// DomEditor.getToolbar(editor) 获取 toolbar 实例
import { DomEditor } from '@wangeditor/editor';

// 导入预设的Html内联样式
import styles from '../components/editorStyles/view.module.scss';
//导入图片类型
import { SlateElement } from '@wangeditor/editor';
import { message } from 'antd';

// 定义图片元素类型
type ImageElement = SlateElement & {
	src: string;
	alt: string;
	url: string;
	href: string;
};
function MyEditor() {
	// editor 实例
	const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法
	// 编辑器初始内容
	const [html, setHtml] = useState('');


	// 工具栏配置
	const toolbarConfig: Partial<IToolbarConfig> = {
		/* 工具栏配置 */
        toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
        excludeKeys: [ /* 隐藏哪些菜单 */ ],
	};

	const toolbar = editor ? DomEditor.getToolbar(editor) : null;
	// let toolbar;
	// if (editor != null) {
	//   toolbar = DomEditor.getToolbar(editor);
	// } else {
	//   toolbar = undefined;
	// }
	const curToolbarConfig = toolbar?.getConfig();
	// 输出出现有的工具栏列表key值
	// 当前菜单排序和分组
	console.log(curToolbarConfig?.toolbarKeys ?? 'noEditor');

	// 初始化编辑器配置
	// 初始化 MENU_CONF 属性
	// 类型是IEditorConfig类型的部分子集，也就是说它可以省略一些IEditorConfig类型的属性
	const editorConfig: Partial<IEditorConfig> = {
	// 编辑器配置，如 placeholder onChange ...
    // 所有的菜单配置，都要在 MENU_CONF 属性下
    MENU_CONF: {
        // 配置字号
        // fontSize: [ ... ],
        // 配置上传图片
        // uploadImage: { ... },
        // 继续其他菜单配置
	}
    }
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
		if (src.indexOf('http') !== 0) {
			return '图片网址必须以 http/https 开头';
		}
		return true;
		// 返回值有三种选择：
		// 1. 返回 true ，说明检查通过，编辑器将正常插入图片
		// 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
		// 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
	}
	// 转换图片链接
	function customParseImageSrc(src: string): string {
		if (src.indexOf('https') !== 0) {
			return `https://${src}`;
		}
		return src;
	}


	editorConfig.placeholder = '请输入内容...';
    
    // 编辑器创建完毕时的回调函数
    editorConfig.onCreated = (editor: IDomEditor) => {
        
    }

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
			<div style={{ border: '1px solid #ccc', zIndex: 100 }}>
				<Toolbar
					editor={editor}
					defaultConfig={toolbarConfig}
					mode="default"
					style={{ borderBottom: '1px solid #ccc' }}
				/>
				<Editor
					defaultConfig={editorConfig}
					value={html}
					onCreated={setEditor}
					onChange={(editor) => setHtml(editor.getHtml())}
					mode="default"
					style={{ height: '300px', overflowY: 'hidden' }}
				/>
			</div>
			<div
				style={{ marginTop: '15px' }}
				className={styles['editor-content-view']}
			>
				{html}
			</div>
		</>
	);
}

export default MyEditor;

// 我看了你发来的代码，它是一个使用@wangeditor/editor-for-react库的React组件，用于创建一个富文本编辑器。我觉得你的代码整体上写得不错，有以下几个优点：

// - 你使用了ES6的模块化导入和导出语法，使得代码结构清晰，便于维护和复用。
// - 你使用了TS的类型注解和类型推导，使得代码更健壮，避免了潜在的类型错误。
// - 你使用了React的函数式组件和Hooks，使得代码更简洁，可读和易于测试。
// - 你使用了@wangeditor/editor-for-react库提供的工具栏配置，菜单配置和自定义函数，使得编辑器更符合你的需求和风格。

// 不过，我也发现了一些可以改进的地方，我给你一些改写升级的建议：

// - 你可以使用ES6的解构赋值语法，来简化一些变量的声明和赋值。比如，
// 你可以把`const toolbarConfig: Partial<IToolbarConfig> = {/* 工具栏配置 */};`改成`const { toolbarConfig }: Partial<IToolbarConfig> = {/* 工具栏配置 */};`，这样就不用再单独声明`toolbarConfig`变量了。
// - 你可以使用ES6的模板字符串语法，来简化一些字符串的拼接。比如，
// 你可以把`return 'https://' + src;`改成`return \`https://${src}\`;`，这样就不用再用加号连接字符串了。
// - 你可以使用TS的可选链语法，来简化一些对空值的判断。比如，
// 你可以把`if (editor == null) return;`改成`return editor?.destroy();`，这样就不用再写if语句了。
// - 你可以使用TS的非空断言操作符语法，来简化一些对非空值的断言。比如，
// 你可以把`if (imageNode == null) return;`改成`const { src, alt, url, href } = imageNode!;`，这样就不用再写if语句了。
// - 你可以使用React的useRef Hook，来保存对编辑器实例的引用。这样就不用再用useState Hook来管理编辑器实例的状态了。比如，
// 你可以把`const [editor, setEditor] = useState<IDomEditor | null>(null);`改成`const editorRef = useRef<IDomEditor | null>(null);`，然后在onCreated回调中把`setEditor(editor);`改成`editorRef.current = editor;`。

// 以上是我的一些Review和分析，希望对你有帮助。如果你还有其他问题或想法，请随时告诉我。😊
