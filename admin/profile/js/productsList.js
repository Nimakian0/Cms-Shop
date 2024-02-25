import { menuAdmin } from "../../../components/menuAdmin/menuAdmin.js";
window.customElements.define("menu-admin",menuAdmin)









let AllProductsgroceries = null;

let SrcProduct = ""
const containerGroceriesElm = document.getElementById("containerGroceries")
let Discountedprice = null
function AddProductsToDom() {
    AllProductsgroceries = JSON.parse(localStorage.getItem("Productsgroceries"))
    AllProductsgroceries.reverse();

    containerGroceriesElm.innerHTML = ""

    AllProductsgroceries.forEach(function (arrayProductsgroceriesItem) {
        const discountAmount = (arrayProductsgroceriesItem.Price * (arrayProductsgroceriesItem.Discount).replace('%', '')) / 100;
        arrayProductsgroceriesItem.Discount == "" ?Discountedprice = "" :Discountedprice = arrayProductsgroceriesItem.Price;
        (arrayProductsgroceriesItem.SrcProduct).split("/")[0] == "img" ? SrcProduct = "../../"+arrayProductsgroceriesItem.SrcProduct : SrcProduct = arrayProductsgroceriesItem.SrcProduct
            containerGroceriesElm.insertAdjacentHTML("beforeend", `
                <div class="GroceriesItem" >
                    <div class="SpecialSellBoxGroceriesItem">
                        <img class="SpecialSellGroceriesItem" src="../../${arrayProductsgroceriesItem.SrcSpecialSell}" alt="">
                    </div>
                    <a href="../../product.html?id=${arrayProductsgroceriesItem.id}" class="imgGroceriesItem">
                        <img class="srcGroceriesItem" src="${SrcProduct}" alt="">
                    </a>
                    <p class="nameGroceriesItem">${arrayProductsgroceriesItem.TextProduct}</p>
                    <div class="ScoreSeller">
                        <div class="Seller">
                            <img class="SellerSvg" src="../../${arrayProductsgroceriesItem.SvgWhichsend}" alt="">
                            <p class="SellerText">${arrayProductsgroceriesItem.TextWhichsend}</p>
                        </div>
                        <div class="Score">
                            <p class="ScoreText">${arrayProductsgroceriesItem.numberStar}</p>
                            <i class="fa-solid fa-star ScoreSvg" style="color: #f9bc00;"></i>
                        </div>
                    </div>
                    <div class="DiscountPrice">
                        <div class="Price">
                            <p class="PriceText">${((arrayProductsgroceriesItem.Price)-discountAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                        </div>
                        <div style="background-color:${arrayProductsgroceriesItem.backgroundDiscount};" class="DiscountBox">
                            <p class="Discount">${arrayProductsgroceriesItem.Discount}</p>
                        </div>
                    </div>
                    <p class="PriceTextFake">${(Discountedprice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>   
                    <button onclick="DeleteProdoct(event)" class="Delete-Product" data-id="${arrayProductsgroceriesItem.id}">حذف محصول</button>
                </div>`)
        })

} //نمایش تمام محصولات




const AddGroceriesBtn = document.getElementById("AddGroceriesBtn")


const ContentAddGroceries = document.getElementById("ContentAddGroceries")
function showAddGroceriesBox () {
    ContentAddGroceries.style.height = "550px"
}

const CancellAddGroceries = document.getElementById("CancellAddGroceries")
function hiddenAddGroceriesBox (e){
    if(e){
        e.preventDefault();
    }
    ContentAddGroceries.style.height = "0px"
    ResetFormContentAddGroceries()
}

const SrsPhotoAddGroceries = document.getElementById("SrsPhotoAddGroceries")
const TextPhotoAddGroceriesBtn = document.getElementById("TextPhotoAddGroceriesBtn")
function IsUploadPhoto (e) {
    TextPhotoAddGroceriesBtn.innerHTML = e.target.files[0].name
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        SrcAddProduct = reader.result
    };
}


const SubAddGroceries = document.getElementById("SubAddGroceries")
const DiscountAddGroceries = document.getElementById("DiscountAddGroceries")
const NameAddGroceries = document.getElementById("NameAddGroceries")
const RadioShippingMethod = document.querySelectorAll(".RadioShippingMethod")
const StarAddGroceries = document.getElementById("StarAddGroceries")
const priceAddGroceries = document.getElementById("priceAddGroceries")
const ErorBox = document.getElementById("ErorBox")
let ErorBoxContent = ""
let SrcAddProduct = null;
function AddGroceries (e) {
    e.preventDefault();
    
    ErorBox.innerHTML = ""
    ErorBoxContent = ""
    if(!NameAddGroceries.value){
        ErorBoxContent ="<p>!نام محصول نمی تواند خالی باشد</p>"
    }
    if(!priceAddGroceries.value){
        ErorBoxContent +="<p>!قیمت محصول نمی تواند خالی باشد</p>"
    }
    if(isNaN(priceAddGroceries.value)){
        ErorBoxContent +="<p>!قیمت محصول را به عدد وارد کنید</p>"
    }
    if(!StarAddGroceries.value){
        ErorBoxContent +="<p>!امتیاز محصول را وارد کنید</p>"
    }

    ErorBoxContent ? true :ErorBoxContent = "<span>محصول با موفقیت اضافه شد</span>";
    ErorBox.innerHTML = ErorBoxContent


    

    if(ErorBox.innerHTML == "<span>محصول با موفقیت اضافه شد</span>"){

        let SrcSpecialSell = null;
        DiscountAddGroceries.value ? SrcSpecialSell = "img/groceries/SpecialSell.svg":SrcSpecialSell=""

        
        if(!SrcAddProduct){
            SrcAddProduct = "img/Productwithoutphoto.svg";
        }

        let FindShippingMethod = null;
        RadioShippingMethod.forEach( Radio =>{
            if(Radio.checked){
                FindShippingMethod = Radio.value
                return true
            }
        })

        
        let svgSvgWhichsend = null;
        if(FindShippingMethod == "ارسال فردا"){
            svgSvgWhichsend = "img/groceries/clock-regular.svg"
        }else if(FindShippingMethod == "ارسال فروشنده"){
            svgSvgWhichsend = "img/groceries/user-regular.svg"
        }else if(FindShippingMethod == "ارسال سریع سوپر مارکتی"){
            svgSvgWhichsend = "img/groceries/truck-solid.svg"
        }
        

        AllProductsgroceries.reverse();
        let Id = null ;
        AllProductsgroceries[AllProductsgroceries.length-1] ? Id = AllProductsgroceries[AllProductsgroceries.length-1].id+1 : Id = 1 ;

        const newGroceries = {
            id: Id,
            SrcSpecialSell: SrcSpecialSell,
            SrcProduct: SrcAddProduct,
            TextProduct: NameAddGroceries.value,
            TextWhichsend: FindShippingMethod,
            SvgWhichsend: svgSvgWhichsend,
            numberStar: StarAddGroceries.value, 
            backgroundDiscount:  DiscountAddGroceries.value ? "#ef394e" : "", 
            Discount: DiscountAddGroceries.value+"%",
            Price: priceAddGroceries.value,
            location: NameAddGroceries.value.split(" ")[0], 
        }

        AllProductsgroceries.push(newGroceries);
        UpdateLocalStorage()
        hiddenAddGroceriesBox()
        // ResetFormContentAddGroceries()
    }


}


function ResetFormContentAddGroceries () {
    NameAddGroceries.value = "";
    priceAddGroceries.value = "";
    DiscountAddGroceries.value = "";
    RadioShippingMethod[0].checked = true ;
    StarAddGroceries.value ="";

    SrsPhotoAddGroceries.type ="file"
    TextPhotoAddGroceriesBtn.innerHTML = "عکس محصول"

    ErorBox.innerHTML = "";
}


function UpdateLocalStorage () {
    localStorage.setItem("Productsgroceries",JSON.stringify(AllProductsgroceries))
    AddProductsToDom()
}




const BlurBox = document.querySelector(".BlurBox")
const BoxDeleteProduct = document.getElementById("BoxDeleteProduct")
const TrueIsDelete = document.getElementById("TrueIsDelete")
const FalseIsDelete = document.getElementById("FalseIsDelete")
window.DeleteProdoct = function DeleteProdoct(e){
    BlurBox.style.display ="unset";
    BoxDeleteProduct.style.display = "flex";
    TrueIsDelete.setAttribute("data-id" , e.target.getAttribute("data-id"));
    document.body.style.overflow = "hidden"
}

TrueIsDelete.addEventListener("click",(e)=>{
    let Idproduct = e.target.getAttribute("data-id");
    let FindIndexProduct = AllProductsgroceries.findIndex(Product =>{
        return Product.id == Idproduct
    })
    AllProductsgroceries.splice(FindIndexProduct,1)
    AllProductsgroceries.reverse();
    UpdateLocalStorage()
    FalseIsDeleteFun()
})
FalseIsDelete.addEventListener("click",FalseIsDeleteFun)

function FalseIsDeleteFun () {
    BlurBox.style.display ="none";
    BoxDeleteProduct.style.display = "none";
    document.body.style.overflow = "unset"
}




AddGroceriesBtn.addEventListener("click",showAddGroceriesBox)
CancellAddGroceries.addEventListener("click",hiddenAddGroceriesBox)
SrsPhotoAddGroceries.addEventListener("change",IsUploadPhoto)
SubAddGroceries.addEventListener("click",AddGroceries)
window.addEventListener("load",AddProductsToDom)
