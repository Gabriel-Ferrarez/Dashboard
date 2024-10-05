const _elements = {
    loading: document.querySelector(".loading"),
    switch: document.querySelector(".switch__track"),
    stateSelectToggle: document.querySelector(".state-select-toggle"),
    selectOptions: document.querySelectorAll(".state-select-list__item"),
    selectList: document.querySelector(".state-select-list"),
    selectToggleIcon: document.querySelector(".state-select-toggle__icon"),
    selectSearchBox: document.querySelector(".state-select-list__search"),
    selectStateSelected: document.querySelector(".state-select-toggle__state-selected"),
    confirmed: document.querySelector(".info__total--confirmed"),
    deaths: document.querySelector(".info__total--deaths"),
    goal: document.querySelector(".info__total--goal"),
    goalDescription: document.querySelector(".data-box__description"),
    adesao: document.querySelector(".info__total--adesao"),
    
}

const _data = {
    id: "brasil=true", 
    confirmed: undefined,
    deaths: undefined,
    confirmedInfo: undefined,
    adesao: undefined,
    goal: undefined

}

const _charts = {};

_elements.switch.addEventListener("click", () => {
    const isDark = _elements.switch.classList.toggle("switch__track--dark");
    
    if(isDark)
        document.documentElement.setAttribute("data-theme", "dark");
    else
        document.documentElement.setAttribute("data-theme", "light");
});

_elements.stateSelectToggle.addEventListener("click", () => {
    _elements.selectToggleIcon.classList.toggle("state-select-toggle__icon--rotate");
    _elements.selectList.classList.toggle("state-select-list--show")
});

_elements.selectOptions.forEach(item => {
    item.addEventListener("click", () => {
        _elements.selectStateSelected.innerText = item.innerText;
        _data.id = item.getAttribute("data-id");
        _elements.stateSelectToggle.dispatchEvent(new Event("click"));

        loadData(_data.id);
    })
}
    
);

_elements.selectSearchBox.addEventListener("keyup", (e) => {
    const search = e.target.value.toLowerCase();

    for(const item of _elements.selectOptions){
        const state = item.innerText.toLowerCase();

        if(state.includes(search)){
            item.classList.remove("state-select-list__item--hide");
        }
        else{
            item.classList.add("state-select-list__item--hide")
        }
    }
});

const request = async (api, id) => {
    try{
        const url = api + id;

        const data = await fetch(url);
        const json = await data.json();

        return json;
    }
        catch(e) {
        console.log(e);
    }
}


const loadData =  async (id) => {
    _elements.loading.classList.remove("loading--hide");

    _data.confirmed = await request(_api.confirmed, id);
    _data.deaths = await request(_api.deaths, id);
    _data.adesao = await request(_api.adesao,id);
    _data.confirmedInfo = await request(_api.confirmedInfo, "");
    _data.goal = await request(_api.goal, "" )
   
    

    updateCards();

    _elements.loading.classList.add("loading--hide");
}

const createBasicChart = (element, config) => {
    const options = {
        chart: {
            type: "line"
        },

        series :[{
            name: 'adesão',
            data: [10]
        }],
        xaxis: {
            categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
          }
    }
    const chart = new Apexcharts(document.querySelector(element), options)
    chart.render();

    return chart;
}

const createDonutChart = (element) => {

}

const createStackedColumnsChart = (element) => {

}

const createCharts = () => {
    _charts.confirmed = createBasicChart(".data-box--30 .data-box__body")
}

const updateCards = () => {
    const uf = _ufs[_data.id];

    _elements.confirmed.innerText = _data.confirmed [_data.confirmed.length-1]["total_de_casos"];
    _elements.deaths.innerText = _data.deaths [_data.deaths.length-1] [ "total_de_mortes"];
    _elements.adesao.innerText = _data.confirmedInfo.extras[uf] .info["total-hoje-dose-1"];
    _elements.goal.innerText = _data.confirmedInfo.extras[uf] .info["total-hoje-dose-2"];

    _elements.confirmed.innerText = Number(_elements.confirmed.innerText).toLocaleString();
    _elements.adesao.innerText = Number(_elements.adesao.innerText).toLocaleString();
    _elements.deaths.innerText = Number(_elements.deaths.innerText).toLocaleString();
    _elements.goal.innerText = Number(_elements.goal.innerText).toLocaleString();

}

const updateCharts = () => {
    
}

const getChartOptions = (series, labels, colors) => {

}

const getDonutChartOptions = (value, name, colors) => {



}

loadData(_data.id);
createCharts();
