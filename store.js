if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    var removeCartItemButtons = document.getElementsByClassName("btn-danger")
    console.log(removeCartItemButtons)
    console.log("Big things will happen.Keep calm.. DO THE WORK NOW AND THE RESULT WILL COMEE.. YOU ARE DESTINED FOR BIGGER THINGS. <3")
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    var addToCartButtons = document.getElementsByClassName("shop-item-button")
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseButtonClicked)
}
function purchaseButtonClicked(){
    alert('Thank you for you purchase !')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()

}
function addToCartClicked(event) {
    var button = event.target
    var container = button.parentElement.parentElement
    var title = container.getElementsByClassName("shop-item-title")[0].innerText
    var imageSrc = container.getElementsByClassName("shop-item-image")[0].src
    var price = container.getElementsByClassName("shop-item-price")[0].innerText
    addItemToCart(title, imageSrc, price)
    updateCartTotal()

}
function addItemToCart(title, imageSrc, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (i=0;i<cartItemNames.length;i++){
        if (cartItemNames[i].innerText == title){
            alert("This item is already added to the cart.Please increase the quantity in cart-list")
            return
        }
    }
    var cartRowContents = ` 
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100">

    <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column"> ${price}</span>
    <div class="cart-quantity cart-column">
    <input class="cart-quantity-input " type="number" value="1">
    <button class="btn btn-danger " role="button">Remove</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)


}
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function updateCartTotal() {
    var CartItemContainer = document.getElementsByClassName('cart-items')[0]

    var CartRows = CartItemContainer.getElementsByClassName('cart-row')

    var total = 0
    for (var i = 0; i < CartRows.length; i++) {
        var CartRow = CartRows[i]
        var PriceElement = CartRow.getElementsByClassName('cart-price')[0]
        var QuantityElement = CartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(PriceElement.innerText.replace("Rs.", ""))
        var quantity = QuantityElement.value
        total = total + (price * quantity)
        total = Math.round(total * 100) / 100
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = "NRs." + total

}