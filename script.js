
document.addEventListener('DOMContentLoaded', init, false);

//Table variables
let lsData, data,searchData, table, links;
const pageSize = 5;
let curPage = 1;
let checkSort = false;


//Data Example:
/*
let exampleData = [
    {"name":"Anh Thi Mot","tel":"029348089","email":"AnhThiMot3890@gmail.com","adress":"anh mot thi","city":"Bắc Ninh","district":"huyện 2","ward":"xã 3"},
    {"name":"Bánh Đúc Nóng","tel":"09745378289","email":"banhbanh7@gmail.com","adress":"Đồng Phủi","city":"Hưng Yên","district":"huyện 2","ward":"xã 5"},
    {"name":"Lê Hồng Nhung","tel":"0234832489","email":"nhunghongle056789@gmail.com","adress":"le hong nhung 123","city":"Hưng Yên","district":"quận 1","ward":"xã 3"},
    {"name":"Nguyễn Văn A","tel":"0834798374","email":"nguyenvanA@gmail.com","adress":"van A","city":"Hà Nội","district":"huyện 1","ward":"xã 1"},
    {"name":"Nguyễn Văn B","tel":"0923487328","email":"nguyenvanB1234@gmail.com","adress":"van B","city":"Cần Thơ","district":"huyện 2","ward":"xã 2"},
    {"name":"Trà Sữa Matcha","tel":"0936429","email":"matchamatme0@gmail.com","adress":"Hoàng Diệu","city":"Cần Thơ","district":"quận 2","ward":"xã 2"},
    {"name":"Trần Lê Bốn","tel":"082937489","email":"trANleBon5678@gmail.com","adress":"bonbon","city":"Hưng Yên","district":"huyện 2","ward":"xã 1"},
    {"name":"Vi Du Muoi","tel":"10100101010","email":"vidumuoi@gmail.com","adress":"vi du muoi","city":"Cần Thơ","district":"quận 2","ward":"xã 1"},
    {"name":"Ví Dụ Ba","tel":"0367297832","email":"vidu321@gmail.com","adress":"ví dụ 3","city":"Hồ Chí Minh","district":"quận 1","ward":"xã 4"},
    {"name":"Ví Dụ Bảy","tel":"0723462347","email":"vidu777@gmail.com","adress":"vi du bay 7","city":"Hà Nội","district":"huyện 1","ward":"xã 4"},
    {"name":"Ví Dụ Bốn","tel":"01231321324","email":"vidubon124@gmail.com","adress":"vi du bon","city":"Bắc Ninh","district":"quận 2","ward":"xã 2"},
    {"name":"Ví Dụ Chín","tel":"0999999999","email":"vidu9123@gmail.com","adress":"9 vi du","city":"Hà Nội","district":"huyện 1","ward":"xã 1"},
    {"name":"Ví Dụ Due","tel":"0222222222","email":"due222452@gmail.com","adress":"due 2 due 2","city":"Đà Nẵng","district":"quận 1","ward":"xã 5"},
    {"name":"Ví Dụ Hai","tel":"093873649","email":"vidu2@gmail.com","adress":"ví dụ 2","city":"Hà Nội","district":"quận 1","ward":"xã 2"},
    {"name":"Ví Dụ Mười Một","tel":"011101010110","email":"vidumuoimot101123@gmail.com","adress":"vi du muoi mot","city":"Hà Nội","district":"quận 2","ward":"xã 2"},
    {"name":"Ví Dụ Một","tel":"0998384678","email":"vidu1545@gmail.com","adress":"ví dụ 1","city":"Cần Thơ","district":"huyện 1","ward":"xã 2"},
    {"name":"Ví Dụ Năm","tel":"0999283892","email":"vidu5@gmail.com","adress":"ci du nam","city":"Hưng Yên","district":"huyện 2","ward":"xã 3"},
    {"name":"Ví Dụ Sáu","tel":"0666666666","email":"vidu6@gmail.com","adress":"ci du sau","city":"Hà Nội","district":"huyện 2","ward":"xã 5"},
    {"name":"Ví Dụ Three","tel":"3333333333","email":"333three@gmail.com","adress":"32333","city":"Hà Nội","district":"huyện 2","ward":"xã 1"},
    {"name":"Ví Dụ Tám","tel":"08123137813","email":"vidu8vidu8@gmail.com","adress":"8 vi du","city":"Hải Phòng","district":"quận 1","ward":"xã 3"},
    {"name":"Ví Dụ Uno","tel":"0234719879","email":"viduuno1345@gmail.com","adress":"1234 vi du uno","city":"Hồ Chí Minh","district":"quận 1","ward":"xã 2"},
    {"name":"Đinh Hà Phương","tel":"09874673002","email":"PhuongLaAK47@gmail.com","adress":"Tank Plane moon","city":"Bắc Ninh","district":"huyện 2","ward":"xã 1"},
    {"name":"Ví Dụ Quattro","tel":"0434444444","email":"viduquattro44380@gmail.com","adress":"4 vi du quattro","city":"Hưng Yên","district":"huyện 1","ward":"xã 1"}
]

localStorage.setItem('users', JSON.stringify(exampleData));
*/

// delete all users data
/*
localStorage.removeItem('users');
*/

lsData = localStorage.getItem('users') ?
JSON.parse(localStorage.getItem('users')) : [] ;

async function init() {
  
    // Selectors
    table = document.querySelector('#dataTable tbody');
    links = document.querySelector('.links');

    const nextBtn = document.querySelector('#nextBtn');
    const prevBtn = document.querySelector('#prevBtn');
    const firstBtn = document.querySelector('#firstBtn');
    const lastBtn = document.querySelector('#lastBtn');

    var searchInput = document.getElementById('searchTextBox');

    pagination(lsData);

    //Page init
    let sortedData;
    data = lsData;

    function pageInit()
    {
        checkSort = false;
        sortName();
        pages = document.querySelectorAll('.links .link');
        pages[0].classList.add("active");
        
        firstBtn.disabled = true;
        prevBtn.disabled = true; 
        nextBtn.disabled = false;
        lastBtn.disabled = false; 

        //Page change
        pages.forEach(page => {
            page.addEventListener('click', function setActivePage(event) {;
                pages.forEach(page => {
                    page.classList.remove("active");
                })
                page.classList.add("active");
                curPage = Number(page.innerHTML);
                setTablePage(curPage);
            });
        });
    }

    pageInit();

    nextBtn.addEventListener('click', nextPage, false);
    prevBtn.addEventListener('click', previousPage, false);
    firstBtn.addEventListener('click', firstPage, false);
    lastBtn.addEventListener('click', lastPage, false);

    //Page Sort
    document.querySelector('#tableHead_Name').addEventListener('click', sortName, false);
    document.querySelector('#tableHead_Email').addEventListener('click', sortEmail, false);


    //Table
    function renderTable(inputData) {
        let result = '';
        inputData.filter((row, index) => {
            let start = (curPage-1)*pageSize;
            let end =curPage*pageSize;
            if(index >= start && index < end) return true;
        }).forEach(c => {
            let index = inputData.indexOf(c);
            result += `
            <tr class="index_${index}">
                <td>${c.name}</td>
                <td>${c.email}
                <button class="btn delete-btn index_${index}"><i class="fas fa-trash-alt"></i></button>
                <button class="btn edit-btn index_${index}"><i class="fas fa-edit"></i></button>
                </td>
            </tr>`;
        }); 
        table.innerHTML = result;
        resetUserModal();
        editDeleteBtn();
    }

    //Pagination 
    function pagination(data) {
        let result = '';
        let pageCount;
        if(data.length === 0){
            page = 1;
            result += `<a href="#" class="link">${page}</a>`
        }else{
            if(data.length%pageSize === 0){
                pageCount= data.length/pageSize;
            } else {
                pageCount= Math.floor(data.length/pageSize)+1; 
            }
            for(let page=1; page <= pageCount; page++){
                result += `<a href="#" class="link">${page}</a>`;
            };
        }
        links.innerHTML = result;
    }

    function previousPage() {
        pages[curPage-1].classList.remove("active");
        if(curPage > 1) curPage--;
        pages[curPage-1].classList.add("active");
        renderTable(data);
        checkPage();
    }
    
    function nextPage() {
        pages[curPage-1].classList.remove("active");
        if((curPage * pageSize) < data.length) curPage++;
        pages[curPage-1].classList.add("active");
        renderTable(data);
        checkPage();
    }

    function firstPage() {
        pages[curPage-1].classList.remove("active");
        curPage = 1;
        pages[curPage-1].classList.add("active");
        renderTable(data);
        checkPage();
    }

    function lastPage() {
        pages[curPage-1].classList.remove("active");
        if(data.length%pageSize === 0){
            curPage= data.length/pageSize;
        } else {
            curPage= Math.floor(data.length/pageSize)+1; 
        }
        pages[curPage-1].classList.add("active");
        renderTable(data);
        checkPage();
    }

    function setTablePage(pageIndex) {
        curPage = pageIndex;
        renderTable(data);
        checkPage();
    }

    //Check page
    function checkPage() {
        let pageCount;
        if(data.length%pageSize === 0 && data.length > 5){
            pageCount = data.length/pageSize;
        } else if (data.length%pageSize !== 1 && data.length > 5){
            pageCount = Math.floor(data.length/pageSize)+1; 
        } else if(data.length >= 0 && data.length <= 5) {
            pageCount = 1;
        }

        if (pageCount === 1) {
            firstBtn.disabled = true;
            prevBtn.disabled = true;
            lastBtn.disabled = true;
            nextBtn.disabled = true;
            return;
        }

        if(curPage === 1) {
            firstBtn.disabled = true;
            prevBtn.disabled = true;
        } else {
            firstBtn.disabled = false;
            prevBtn.disabled = false;
        }
         
        if(curPage === pageCount){
            lastBtn.disabled = true;
            nextBtn.disabled = true;
        } else {
            lastBtn.disabled = false;
            nextBtn.disabled = false;
        }
    }

    //Search
    searchInput.onkeyup = function search() {
        searchData = [];

        var filter = searchInput.value.toUpperCase();
        filter = filter.trim();

        if(searchInput !== ""){
            for(var i = 0; i<lsData.length; i++){
                if(lsData[i].email.toUpperCase().indexOf(filter) > -1){
                        searchData.push({
                            "name"      : lsData[i].name,
                            "tel"       : lsData[i].tel,
                            "email"     : lsData[i].email,
                            "adress"    : lsData[i].adress,
                            "city"      : lsData[i].city,
                            "district"  : lsData[i].district,
                            "ward"      : lsData[i].ward
                        });
                }
            }
            data = searchData;
        }else{
            data = lsData;
        }
        renderTable(data);
        pagination(data);
        pageInit();
        sortEmail();
        firstPage();
    }

    //Sort
    function sortName() {
        if(checkSort===false){
            sortedData = data.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                  return -1;
                }
            });
        } else {
            sortedData = data.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return -1;
                }
            });
        }

        checkSort = !checkSort;
        data = sortedData;
        renderTable(data);
    }

    function sortEmail() {
        if(checkSort===false){
            sortedData = data.sort((a, b) => {
                if (a.email.toLowerCase() < b.email.toLowerCase()) {
                  return -1;
                }
            });
        } else {
            sortedData = data.sort((a, b) => {
                if (a.email.toLowerCase() > b.email.toLowerCase()) {
                  return -1;
                }
            });
        }

        checkSort = !checkSort;
        data = sortedData;
        renderTable(data);
    }

    //Form save data
    const form = document.querySelector('form');
    const closeBtn = document.getElementById('closeBtn');
    const submitBtn = document.getElementById('submitBtn');

    const name = document.getElementById('name');
    const tel = document.getElementById('phoneNumber');
    const email = document.getElementById('email');
    const adress = document.getElementById('adress');
    const city = document.getElementById('city');
    const district = document.getElementById('district');
    const ward = document.getElementById('ward');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        var userData = [
            {name: name.value, tel: tel.value, email: email.value, adress: adress.value, city: city.value, district: district.value, ward: ward.value}
        ]

        userData.map(function(item) {
            lsData.push({
                "name"      : item.name,
                "tel"       : item.tel,
                "email"     : item.email,
                "adress"    : item.adress,
                "city"      : item.city,
                "district"  : item.district,
                "ward"      : item.ward
            });
        })

        localStorage.setItem('users', JSON.stringify(lsData));

        data = lsData;
        pagination(data);
        pageInit();
        firstPage();
        searchInput.value = "";

        alert("user info saved");
        form.reset();
    });   

    //Form city - district - country
    city.onchange = function() {
        switch(city.value) {
            case 'Hà Nội':
                district.innerHTML =  `
                <option value="default" disabled selected>Chọn giá trị</option>
                <option value="huyện 1">huyện 1</option>
                <option value="huyện 2">huyện 2</option>
                <option value="quận 1">quận 1</option>
                <option value="quận 2">quận 2</option>
                `
                ward.innerHTML = `
                <option value="default" disabled selected>Chọn giá trị</option>  
                <option value="xã 1">xã 1</option>
                <option value="xã 2">xã 2</option>
                <option value="xã 3">xã 3</option>
                <option value="xã 4">xã 4</option>
                <option value="xã 5">xã 5</option>
                `
            break;
            
            case 'Hồ Chí Minh':
                district.innerHTML =  `
                <option value="default" disabled selected>Chọn giá trị</option>
                <option value="huyện 1">huyện 1</option>
                <option value="huyện 2">huyện 2</option>
                <option value="quận 1">quận 1</option>
                <option value="quận 2">quận 2</option>
                `
                ward.innerHTML = `
                <option value="default" disabled selected>Chọn giá trị</option>  
                <option value="xã 1">xã 1</option>
                <option value="xã 2">xã 2</option>
                <option value="xã 3">xã 3</option>
                <option value="xã 4">xã 4</option>
                <option value="xã 5">xã 5</option>
                `
            break;

            case 'Cần Thơ':
                district.innerHTML =  `
                <option value="default" disabled selected>Chọn giá trị</option>
                <option value="huyện 1">huyện 1</option>
                <option value="huyện 2">huyện 2</option>
                <option value="quận 1">quận 1</option>
                <option value="quận 2">quận 2</option>
                `
                ward.innerHTML = `
                <option value="default" disabled selected>Chọn giá trị</option>  
                <option value="xã 1">xã 1</option>
                <option value="xã 2">xã 2</option>
                <option value="xã 3">xã 3</option>
                <option value="xã 4">xã 4</option>
                <option value="xã 5">xã 5</option>
                `
            break;

            case 'Bắc Ninh':
                district.innerHTML =  `
                <option value="default" disabled selected>Chọn giá trị</option>
                <option value="huyện 1">huyện 1</option>
                <option value="huyện 2">huyện 2</option>
                <option value="quận 1">quận 1</option>
                <option value="quận 2">quận 2</option>
                `
                ward.innerHTML = `
                <option value="default" disabled selected>Chọn giá trị</option>  
                <option value="xã 1">xã 1</option>
                <option value="xã 2">xã 2</option>
                <option value="xã 3">xã 3</option>
                <option value="xã 4">xã 4</option>
                <option value="xã 5">xã 5</option>
                `
            break;

            case 'Hải Phòng':
                district.innerHTML =  `
                <option value="default" disabled selected>Chọn giá trị</option>
                <option value="huyện 1">huyện 1</option>
                <option value="huyện 2">huyện 2</option>
                <option value="quận 1">quận 1</option>
                <option value="quận 2">quận 2</option>
                `
                ward.innerHTML = `
                <option value="default" disabled selected>Chọn giá trị</option>  
                <option value="xã 1">xã 1</option>
                <option value="xã 2">xã 2</option>
                <option value="xã 3">xã 3</option>
                <option value="xã 4">xã 4</option>
                <option value="xã 5">xã 5</option>
                `
            break;

            case 'Đà Nẵng':
                district.innerHTML =  `
                <option value="default" disabled selected>Chọn giá trị</option>
                <option value="huyện 1">huyện 1</option>
                <option value="huyện 2">huyện 2</option>
                <option value="quận 1">quận 1</option>
                <option value="quận 2">quận 2</option>
                `
                ward.innerHTML = `
                <option value="default" disabled selected>Chọn giá trị</option>  
                <option value="xã 1">xã 1</option>
                <option value="xã 2">xã 2</option>
                <option value="xã 3">xã 3</option>
                <option value="xã 4">xã 4</option>
                <option value="xã 5">xã 5</option>
                `
            break;

            case 'Hưng Yên':
                district.innerHtml =  `
                <option value="default" disabled selected>Chọn giá trị</option>
                <option value="huyện 1">huyện 1</option>
                <option value="huyện 2">huyện 2</option>
                <option value="quận 1">quận 1</option>
                <option value="quận 2">quận 2</option>
                `
                ward.innerHTML = `
                <option value="default" disabled selected>Chọn giá trị</option>  
                <option value="xã 1">xã 1</option>
                <option value="xã 2">xã 2</option>
                <option value="xã 3">xã 3</option>
                <option value="xã 4">xã 4</option>
                <option value="xã 5">xã 5</option>
                `
            break;

            default:
        }
    }

    //See only modal - SOM
    const modal = document.getElementById('userInfoModal');
    const seeOnlyModal = document.getElementById('seeModalBtn');

    const inputs = document.querySelectorAll(".modal-body input");
    const selects = document.querySelectorAll(".modal-body select");

    function resetUserModal(){
        let users = document.querySelectorAll("#dataTable tbody tr");

        users.forEach(user => {
            $(document).add(function(){
                $(user).click(function(){
                    resetModal();

                    submitBtn.disabled = true;

                    let string = user.className;
                    let index = string.slice(-(string.length-6));
    
                    name.value = data[index].name;
                    tel.value = data[index].tel;
                    email.value = data[index].email;
                    adress.value = data[index].adress;
                    city.value = data[index].city;
                    district.value = data[index].district;
                    ward.value = data[index].ward;
            
                    inputs.forEach(input => {
                        input.readOnly = true;
                    })
                    selects.forEach(select => {
                        select.disabled = true;
                    })
                    $(modal).modal("show");
                });
            });
        })
    }

    //reset modal
    function resetModal(){
        submitBtn.disabled = false;
        saveBtn.disabled = true;
    
        name.value = "";
        tel.value = "";
        email.value = "";
        adress.value = "";
        city.value = "";
        district.value = "";
        ward.value = "";
            
        inputs.forEach(input => {
            input.readOnly = false;
        })
        selects.forEach(select => {
            select.disabled = false;
        })
    }
  
    //Add user modal
    const addBtn = document.getElementById('addBtn');

    $(document).ready(function(){
        $(addBtn).click(function(){
            resetModal();
          $(modal).modal("show");
        });
    });
    
    //Remove user(name) from local storage
    function removeUser(data, name) {
        const requiredIndex = data.findIndex(el => {
            return el.name === String(name);
        });

        !!data.splice(requiredIndex, 1);
        
        localStorage.setItem('users', JSON.stringify(data));
    }

    //Delete or edit user data
    function editDeleteBtn() {
        let editBtns = document.querySelectorAll("#dataTable tbody tr td .edit-btn");
        let deleteBtns = document.querySelectorAll("#dataTable tbody tr td .delete-btn");
        
        deleteBtns.forEach(deleteBtn => {
            $(deleteBtn).click(function(e) {
                e.stopPropagation();
    
                let string = deleteBtn.className.split(" ")[2];
                let index = string.slice(-(string.length-6));
                let nameToRemove = lsData[index].name;

                confirm("Bạn có chắc chắn muốn xóa dữ liệu của người dùng " + nameToRemove  + "?")?
                (removeUser(lsData, nameToRemove),data = lsData, pagination(data), pageInit(), firstPage(), searchInput.value = "")
                :console.log("nothing happened");
            });
        })

        editBtns.forEach(editBtn => {
            $(editBtn).click(function(e) {
                e.stopPropagation();

                resetModal();
    
                var string = editBtn.className.split(" ")[2];
                var index = string.slice(-(string.length-6));
        
                name.value = data[index].name;
                tel.value = data[index].tel;
                email.value = data[index].email;
                adress.value = data[index].adress;
                city.value = data[index].city;
                district.value = data[index].district;
                ward.value = data[index].ward;

                const lsIndex = lsData.findIndex(el => {
                    return el.name === String(name.value);
                });

                //replace submit btn with save btn
                submitBtn.disabled = true;
                saveBtn.disabled = false;

                $(modal).modal("show");

                saveBtn.onclick= function(e){
                    e.preventDefault();

                    lsData[lsIndex].name = name.value;
                    lsData[lsIndex].tel = tel.value;
                    lsData[lsIndex].email = email.value;
                    lsData[lsIndex].adress = adress.value;
                    lsData[lsIndex].city = city.value;
                    lsData[lsIndex].district = district.value;
                    lsData[lsIndex].ward = ward.value;

                    localStorage.setItem('users', JSON.stringify(lsData));

                    data = lsData;
                    pagination(data);
                    pageInit();
                    firstPage();
                    searchInput.value = "";

                    $(modal).modal("hide"); 
                };
            });
        })
    }
}
