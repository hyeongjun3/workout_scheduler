let readPrivateBtn = null;
let editModeBtn = null;
let privateInfoBtnGroup = null;
let inputEvent = new Event('input', { bubbles: true, cancelable: true });
let clickEvent = new Event('click', { bubbles: true, cancelable: true });

beforeAll(() => {
  require('./daily.js');
  readPrivateBtn = document.querySelector(
    '[data-testid="test-read-private-btn"]'
  );
});

describe('[Read Private Info]', () => {
  test('Open private info window', () => {
    let beforeClickWindowElem = document.querySelector(
      '[data-testid="test-private-info-window"]'
    );
    readPrivateBtn.dispatchEvent(clickEvent);
    let afterClickWindowElem = document.querySelector(
      '[data-testid="test-private-info-window"]'
    );

    expect(beforeClickWindowElem).toBe(null);
    expect(afterClickWindowElem).not.toBe(null);
  });
});

describe('[Edit Private Info][WS-119]', () => {
  beforeEach(() => {
    readPrivateBtn.dispatchEvent(clickEvent);
    privateInfoBtnGroup = document.querySelector(
      '[data-testid="test-info-btn-group"]'
    );
    editModeBtn = document.querySelector('[data-testid="test-edit-btn"]');
  });

  test('Enter edit mode of private info window', () => {
    expect(privateInfoBtnGroup.classList.contains('hidden')).toBe(true);
    editModeBtn.dispatchEvent(clickEvent);
    expect(privateInfoBtnGroup.classList.contains('hidden')).toBe(false);
  });
});
