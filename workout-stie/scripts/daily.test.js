let readPrivateBtn = null;

beforeAll(() => {
  require('./daily.js');
  readPrivateBtn = document.querySelector('[data-testid="test-read-private-btn"]')
});

describe('[Read Private Info]', () => {

  let inputEvent = new Event('input', {bubbles : true, cancelable : true});
  let clickEvent = new Event('click', {bubbles : true, cancelable : true});

  test('Open private info window', () => {
    let beforeClickWindowElem = document.querySelector('[data-testid="test-private-info-window"]');
    readPrivateBtn.dispatchEvent(clickEvent);
    let afterClickWindowElem = document.querySelector('[data-testid="test-private-info-window"]');

    expect(beforeClickWindowElem).toBe(null);
    expect(afterClickWindowElem).not.toBe(null);
  });
});
