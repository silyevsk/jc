const fs = require('fs');
const crypto = require('crypto');

class JsonParser {
  constructor(path) {
    this._path = path;
    this.objects = {};
    this.root = {};
  }

  parse() {
    let file;
    try {
      file = fs.readFileSync(this._path, 'utf8');
    } catch (e) {
      console.err(`Couldn't load file: ${this._path}`);
      return false;
    }

    let json;
    try {
      json = JSON.parse(file);
    } catch (e) {
      console.err(`Couldn't parse json: ${this._path}`);
      return false;
    }

    this.root = this._process(json);
    return true;
  }

  _process(item) {
    let node = {};
    let type;
    if (Array.isArray(item)) {
      type = 'array';
    } else if (item === null) {
      type = 'null';
    } else {
      type = typeof item;
    }
    node.type = type;
    switch (type) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'null':
        node.value = item;
        this._hashNode(node, `${type}|${item}`);
        break;
      case 'array':
        node.children = item.map(x => this._process(x));
        this._hashNode(node, 'array|' + node.children.map(x => x.hash).join(','));
        break;
      case 'object':
        node.children = Object.fromEntries(Object.entries(item).map(([k, v]) => [k, this._process(v)]));
        this._hashNode(node, 'object|' + Object.entries(node.children).map(([k, v]) => `${k}->${v.hash}`).join(','));
        break;
      default:
        console.error(`Unexpected type: ${type}`);
        process.exit(1);
    }
    return node;
  }

  _hashNode(node, hashableString) {
    node.hash = crypto.createHash('sha256').update(hashableString).digest('hex').toString();
    const l1Key = node.hash.substring(0, 2);
    const l2Key = node.hash.substring(2);
    let l1Value = this.objects[l1Key];
    if (l1Value === undefined) {
      l1Value = {};
      this.objects[l1Key] = l1Value;
    }
    let l2Value = l1Value[l2Key];
    if (l2Value === undefined) {
      l2Value = [];
      l1Value[l2Key] = l2Value;
    }
    l2Value.push(node);
  }
}

module.exports = {JsonParser};
