function traverseDOM(node, onVisit, onComplete, onBack) {
    if (!node || node.nodeType !== 1) return onComplete();

    onVisit(node, function continueToChildren() {
        const children = Array.from(node.children);
        let index = 0;

        function processNextChild() {
            if (index >= children.length) {
                onComplete();
                return;
            }
            traverseDOM(children[index++], onVisit, processNextChild, onBack);
        }
        processNextChild();
    }, onBack);
}

function getNodeInfo(node) {
    const tag = node.tagName.toLowerCase();
    const id = node.id ? ` #${node.id}` : '';
    const classes = node.className ? ` .${node.className.trim().replace(/\s+/g, '.')}` : '';
    const text = node.textContent.replace(/\s+/g, ' ').trim();
    const shortText = text.length > 100 ? text.substring(0, 97) + '...' : text;

    return `<${tag}${id}${classes}>\n` +
           `Текст: "${shortText || '(порожньо)'}"\n` +
           `Дітей: ${node.children.length}`;
}

function startDOMTour() {
    const root = document.body;
    const history = [];
    let current = null;

    function visitNode(node, continueCb, backCb) {
        current = node;
        const info = getNodeInfo(node);
        const hasChildren = node.children.length > 0;
        const isRoot = node === root && history.length === 0;

        let choice;

        if (isRoot) {
            choice = confirm(`ПОЧАТОК\n\n${info}\n\nOK → до першої дитини`);
            if (choice) {
                history.push(node);
                continueCb();
            } else {
                alert("Обхід завершено.");
            }
        }
        else if (!hasChildren) {
            choice = confirm(`ЛИСТ\n\n${info}\n\nOK → назад\nCancel → завершити`);
            if (choice) backCb();  
            else alert("Обхід завершено.");
        }
        else {
            choice = confirm(`ВУЗОЛ\n\n${info}\n\nOK → до дитини\nCancel → назад`);
            if (choice) {
                history.push(node);
                continueCb();
            } else {
                backCb();
            }
        }
    }

    function goBack() {
        if (history.length === 0) {
            alert("Обхід завершено.");
            return;
        }
        history.pop();
        const parent = history[history.length - 1];
        const siblings = Array.from(parent.children);
        const idx = siblings.indexOf(current);

        if (idx + 1 < siblings.length) {
            traverseDOM(siblings[idx + 1], visitNode, () => {}, goBack);
        } else {
            traverseDOM(parent, visitNode, () => {}, goBack);
        }
    }

    alert("Запуск обходу...");
    traverseDOM(root, visitNode, () => {
        alert("Обхід завершено.");
    }, goBack);
}

document.addEventListener("DOMContentLoaded", startDOMTour);
