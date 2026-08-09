import assert from "node:assert/strict";
import test from "node:test";

const siteTitle = /<title>Curlbee Design — портфолио<\/title>/i;
const siteDescription = /<meta(?=[^>]*\bname=["']description["'])(?=[^>]*\bcontent=["']Портфолио независимого дизайнера:[^"']+["'])[^>]*>/i;

test("renders Curlbee production metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, siteTitle);
  assert.match(html, siteDescription);
  assert.match(html, /class="cards-intro"/i);
  assert.match(html, /Карточки/i);
  assert.match(html, /Отдельные миры/i);
  assert.match(html, /class="cards-world-map"/i);
  assert.match(html, /class="theme-toggle"/i);
  assert.match(html, /curlbee-theme/i);
  assert.equal((html.match(/cards-world-link cards-world-link-/gi) ?? []).length, 5);
  assert.match(html, /EVEN/i);
  assert.match(html, /CRAFTED/i);
  assert.match(html, /VÉLUM/i);
  assert.match(html, /MINIMALIST SKINCARE/i);
  assert.match(html, /AYU/i);
  assert.match(html, /href="\/cards\/velum\?lang=ru"/i);
  assert.doesNotMatch(html, /class="cards-chapter"/i);
  assert.doesNotMatch(html, /cards-world-membrane/i);
  assert.doesNotMatch(html, /cards-bridge-chapter-mark/i);
  assert.doesNotMatch(html, /Следующая глава/i);

  const cardsResponse = await worker.fetch(
    new Request("http://localhost/cards/velum?lang=ru", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
  assert.equal(cardsResponse.status, 200);
  const cardsHtml = await cardsResponse.text();
  assert.match(cardsHtml, /class="cards-world-page"/i);
  assert.match(cardsHtml, /class="cards-chapter cards-project-chapter"/i);
  assert.match(cardsHtml, /Карточки товара · серия 01/i);
  assert.match(cardsHtml, /VÉLUM/i);

  const evenWorldResponse = await worker.fetch(
    new Request("http://localhost/cards/even?lang=ru", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
  assert.equal(evenWorldResponse.status, 200);
  const evenWorldHtml = await evenWorldResponse.text();
  assert.match(evenWorldHtml, /class="even-world/i);
  assert.match(evenWorldHtml, /Одежда для каждого/i);
  assert.doesNotMatch(evenWorldHtml, /class="theme-toggle"/i);
});
