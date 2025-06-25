type StrParseHtml = {
    (html: string): {
        node: Element;
        attrs: Record<string, string>;
    }
}


// 根据传入的 html 字符串，将其转换为 html 节点，并返回节点和属性
export const strParseHtml: StrParseHtml = (html) => {
    const parser = new DOMParser();

    // 将 HTML 字符串解析为 DOM 文档对象,例如：'<card msg="hello"/>' 会被解析为 DOM 结构
    const doc = parser.parseFromString(html, 'text/html');

    // 获取解析后的第一个元素（即 card 元素）
    // doc.body.firstElementChild 就是 <card> 标签对应的 DOM 元素
    const currentNode = doc.body.firstElementChild as Element;

    // 提取 card 元素的所有属性
    const attrs: Record<string, string> = {};
    for (let i = 0; i < currentNode.attributes.length; i++) {
        const attr = currentNode.attributes[i];
        // 将每个属性名和属性值存储到 attrs 对象中,例如：msg="hello" 会被存储为 { msg: "hello" }
        attrs[attr.name] = attr.value;
    }

    return {
        node: currentNode,
        attrs,
    };
};