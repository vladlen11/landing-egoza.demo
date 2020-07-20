const list_items = [
    'item 1',
    'item 2',
    'item 3',
    'item 4',
    'item 5',
    'item 6',
    'item 7',
    'item 8',
    'item 9',
    'item 10',
    'item 11',
    'item 12',
    'item 13',
    'item 14',
    'item 15',
    'item 16',
    'item 17',
    'item 18',
    'item 19',
    'item 20',
    'item 21',
    'item 22',
    'item 23',
    'item 24',
    'item 25',
];

const list_element = document.getElementById('list');
const pageNumbers_element = document.getElementById('pagination');

let current_page = 1;
let rows = 5;

function displayList(items, wrapper, rows_per_page, page) {
    wrapper.innerHTML = '';
    page--;

    let start = rows_per_page * page;
    let end = start + rows_per_page;

    let loop_start = rows_per_page * page;
    let paginatedItems = items.slice(loop_start, loop_start + rows_per_page);
    console.log(paginatedItems, 'paginatedItems');

    for (let i = 0; i < paginatedItems.length; i++) {
        let item = paginatedItems[i];

        let item_element = document.createElement('div');
        item_element.classList.add('item');
        item_element.innerText = item;

        wrapper.appendChild(item_element);

    }


}
function SetupPagination(items, wrapper, rows_per_page) {
    wrapper.innerHTML = '';

    let page_count = Math.ceil(items.length /rows_per_page);

    for (let i =1; i < page_count + 1; i++) {
        let btn = PaginationButton(i);
        wrapper.appendChild(btn)
    }
}
function PaginationButton(page) {
    let button = document.createElement('button');
    button.innerText = page;

    if (current_page == page) button.classList.add('active');

    return button;

}

displayList(list_items, list_element, rows, current_page);
SetupPagination(list_items, pagination_element);