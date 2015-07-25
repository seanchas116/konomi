import {SourceNode} from "source-map";

export
function concatSourceNodes(nodes) {
  return new SourceNode(null, null, null, nodes);
}
