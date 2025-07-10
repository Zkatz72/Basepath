class TrieNode{

    constructor(){
        this.children = new Map();
        this.is_end = false
        this.values = []
    }

}

class Trie{

    constructor(){
        this.root = new TrieNode();
    }
    insert(key, value){
        let node = this.root;
        for (let char of key){
            if(!node.children.has(char)){
                node.children.set(char, new TrieNode());
    
            }
            node = node.children.get(char);
        }
        node.is_end = true;
        node.values.push(value)
    }
    search(key) {
        let node = this._findNode(key);
        return node && node.is_end ? node.value : null;
    }

    _findNode(prefix) {
        let node = this.root;
        for (let char of prefix) {
        if (!node.children.has(char)) return null;
            node = node.children.get(char);
        }
        return node;
    }

    getWithPrefix(prefix) {
  const node = this._findNode(prefix);
  const result = [];
  if (node) {
    this._dfs(node, result);
  }
  return result;
}

_dfs(node, result) {
  if (node.is_end) {
    for (const val of node.values) {
        result.push(val);
      }
  }
  for (let child of node.children.values()) {
    this._dfs(child, result);
  }
}



}

export default Trie;