
///tabs
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){

    const
        tabsParent = document.querySelector(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabs = tabsParent.querySelectorAll(tabsParentSelector);


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function shwoTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    shwoTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        //console.log(target);
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    shwoTabContent(i);
                }
            });
        }
    });
}

export default tabs;