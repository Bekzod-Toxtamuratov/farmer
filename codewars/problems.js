/* Bog'langan ro'yxatni hisobga olgan holda , bir vaqtning o'zida headro'yxatning tugunlarini teskari aylantiring va o'zgartirilgan ro'yxatni qaytaring .k

kmusbat butun son boʻlib, bogʻlangan roʻyxat uzunligidan kichik yoki unga teng. Agar tugunlar soni kqolgan tugunlarning ko'paytmasi bo'lmasa , oxirida avvalgidek qolishi kerak.

Roʻyxat tugunlaridagi qiymatlarni oʻzgartira olmaysiz, faqat tugunlarning oʻzi oʻzgartirilishi mumkin. */

class countList {
  constructor() {
    this.counting = 0;
    this.tempRef = null;
  }
  count(list) {
    this.tempRef = list;
    while (this.tempRef) {
      this.counting += 1;
      this.tempRef = this.tempRef.next;
    }
    return this.counting;
  }
}

class reverseList {
  constructor() {
    this.newList = null;
  }
  reverse(head, prev) {
    let next = null;

    while (head !== null) {
      next = head.next;
      head.next = prev;
      prev = head;
      head = next;
    }
    return prev;
  }
}

class Node {
  constructor(data, next = null) {
    this.val = data;
    this.next = next;
  }
}

function cutSubNodesAsPerTheSizeGiven(head, size, cutSubNodes = new Node()) {
  function cutSubNodesAsPerTheSizeGivenHelper(head, HelperSize, cutSubNodes) {
    if (head == null || HelperSize === 0) {
      return head;
    }
    const save = head;
    head = head.next;
    save.next = null;
    cutSubNodes.next = save;
    return cutSubNodesAsPerTheSizeGivenHelper(
      head,
      (HelperSize -= 1),
      cutSubNodes.next,
    );
  }
  const leftHead = cutSubNodesAsPerTheSizeGivenHelper(head, size, cutSubNodes);
  return { cutSubNodes: cutSubNodes.next, leftHead };
}

var reverseKGroup = function (head, size) {
  const totalNode = new countList().count(head);
  const lastNodesToBeSkipped = totalNode % size;
  function splitNodesAsPerSize(head, size, nodesExplored = 0) {
    if (totalNode - lastNodesToBeSkipped === nodesExplored) {
      return head;
    }
    const { cutSubNodes, leftHead } = cutSubNodesAsPerTheSizeGiven(head, size);
    const response = splitNodesAsPerSize(
      leftHead,
      size,
      (nodesExplored += size),
    );
    return new reverseList().reverse(cutSubNodes, response);
  }
  return splitNodesAsPerSize(head, size);
};
