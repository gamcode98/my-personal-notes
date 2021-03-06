const d = document;
export default function templateSummary() {
  const $template = d.getElementById("template-summary").content;
  const $fragment = d.createDocumentFragment();
  const $subFragment = d.createDocumentFragment();
  const $h3 = d.querySelectorAll("h3");
  const $h2 = d.querySelectorAll("h2");
  const $main = d.querySelector("main");
  const $sectionMain = d.getElementById("section-main");

  $h2.forEach((el) => {
    let $summary = d.createElement("summary");
    let $details = d.createElement("details");
    let $ol = d.createElement("ol");
    $details.appendChild($summary);
    $details.appendChild($ol);
    $summary.textContent = el.textContent;
    $subFragment.appendChild($details);

    el.parentElement.id = `${el.id}-title`;
  });
  $template.querySelector("section").appendChild($subFragment);

  const $sections = $sectionMain.querySelectorAll("section");

  let i = 0;
  $sections.forEach((el) => {
    let $h3 = el.querySelectorAll("h3");
    $h3.forEach((el) => {
      let $li = d.createElement("li");
      let $a = d.createElement("a");
      $a.setAttribute("href", `#${el.id}`);
      $a.textContent = el.textContent;
      $li.appendChild($a);
      let $details = $template.querySelectorAll("details");
      $details[i].querySelector("ol").appendChild($li);
    });
    i++;
  });

  let $clone = $template.cloneNode(true);
  $main.insertBefore($clone, $sectionMain);
}
