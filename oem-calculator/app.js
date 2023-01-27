// Storage Controller
const StorageController = (function () {

    return {
        storeProduct: function(product) {
            let products;

            if(localStorage.getItem("products")===null) {
                products = [];
            } else {
                products = JSON.parse(localStorage.getItem("products"));
            }
            products.push(product);
            localStorage.setItem("products", JSON.stringify(products));
        },
        getProducts: function() {
            let products;
            if(localStorage.getItem("products")===null) {
                products = []
            } else {
                products = JSON.parse(localStorage.getItem("products"));
            }

            return products
        },
        updateProduct: function(updatedProduct) {
            let products = JSON.parse(localStorage.getItem("products"));

            products.forEach((product, index) => {
                if(product.id == updatedProduct.id) {
                    products.splice(index,1,updatedProduct) // update obje prop set etmekten farklı method
                }
            });

            localStorage.setItem("products", JSON.stringify(products));
        },
        deleteProduct: function(id) {
            let products = JSON.parse(localStorage.getItem("products"));

            products.forEach((product, index) => {
                if (product.id == id) {
                    products.splice(index, 1)
                }
            });

            localStorage.setItem("products", JSON.stringify(products));
        }
    }
})()




// Product Controller
const ProductController = (function (StorageCtrl) {

    const Product = function (id, name, price) { // ES6 sonrası class yapısı ile de kurulabilir
        this.id = id;
        this.name = name;
        this.price = price;
    }

    const data = {
        products: StorageCtrl.getProducts(),
        selectedProduct: null,
        totalPrice: 0
    }

    return {
        getProducts: function () {
            return data.products;
        },
        getProductById: function (id) {
            let product = null;
            data.products.forEach(prd => {
                if (prd.id == id) {
                    product = prd;
                }
            })
            return product
        },
        getData: function () {
            return data;
        },
        addProduct: function (name, price) {
            let id;

            if (data.products.length > 0) {
                id = data.products[data.products.length - 1].id + 1
            } else {
                id = 0;
            }

            const newProduct = new Product(id, name, parseFloat(price));
            data.products.push(newProduct);
            return newProduct;
        },
        getTotal: function () {
            return data.totalPrice;
        },
        setTotal: function (total) {
            data.totalPrice = total
        },
        calculateTotal: function () {
            let total = 0;
            data.products.forEach(product => {
                total += product.price;
            });

            return total;
        },
        setSelectedProduct: function (product) {
            data.selectedProduct = product
        },
        getSelectedProduct: function () {
            return data.selectedProduct;
        },
        updateProduct: function (productName, productPrice) {
            let product = null;

            data.products.forEach(prod => {
                if (prod.id == data.selectedProduct.id) {
                    prod.name = productName;
                    prod.price = parseFloat(productPrice);
                    product = prod;
                }
            })

            return product
        },
        deleteProduct: function (id) {
            let deletedProduct;
            data.products.forEach((product, index) => {
                if(product.id == id) {
                    console.log(index);
                    deletedProduct = product;
                    data.products.splice(index, 1);
                }
            })
        }
    }

})(StorageController)




// UI Controller
const UIController = (function () {

    const Selectors = {
        productList: "#item-list",
        productListItem: "#item-list tr",
        addButton: "#addBtn",
        saveButton: "#saveBtn",
        deleteButton: "#deleteBtn",
        cancelButton: "#cancelBtn",
        productName: "#productName",
        productPrice: "#productPrice",
        productCard: "#productCard",
        totalTL: "#total-tl",
        totalDolar: "#total-dolar",
        editButton: ".edit-product"
    }

    return {
        createProductList: function (products) {
            let html = "";

            products.forEach(product => {
                html += `<tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.price} $</td>
                        <td class="text-end">  
                            <i class="far fa-edit edit-product btn btn-light"></i> 
                        </td>
                    </tr>`
            });

            document.querySelector(Selectors.productList).innerHTML = html;
        },
        getSelectors: function () {
            return Selectors
        },
        addProduct: function (product) {
            // when added first product
            document.querySelector(Selectors.productCard).style.display = "block";
            var item = `<tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.price} $</td>
                        <td class="text-end">
                            <i class="far fa-edit edit-product btn btn-light"></i>
                        </td>
                    </tr>`
            document.querySelector(Selectors.productList).innerHTML += item;
        },
        clearInputs: function () {
            document.querySelector(Selectors.productName).value = "";
            document.querySelector(Selectors.productPrice).value = "";
        },
        hideCard: function () {
            document.querySelector(Selectors.productCard).style.display = "none";
        },
        displayTotal: function (total) {
            let rate = 19;
            document.querySelector(Selectors.totalDolar).textContent = total;
            document.querySelector(Selectors.totalTL).textContent = total * rate;
        },
        addProductToForm: function (selectedProduct) {
            document.querySelector(Selectors.productName).value = selectedProduct.name;
            document.querySelector(Selectors.productPrice).value = selectedProduct.price;
            document.querySelector(Selectors.productName).focus();
        },
        clearBackgroundOfRows: function () {
            const rows = document.querySelectorAll(Selectors.productListItem);
            rows.forEach(row => {
                if (row.classList.contains("bg-warning")) {
                    row.classList.remove("bg-warning");
                }
            })
        },
        addingState: function () {

            this.clearInputs();
            this.clearBackgroundOfRows();

            document.querySelector(Selectors.addButton).style.display = "inline";
            document.querySelector(Selectors.saveButton).style.display = "none";
            document.querySelector(Selectors.deleteButton).style.display = "none";
            document.querySelector(Selectors.cancelButton).style.display = "none";
        },
        editState: function (rowElement) {
            
            this.clearBackgroundOfRows();
            
            rowElement.classList.add("bg-warning");
            document.querySelector(Selectors.addButton).style.display = "none";
            document.querySelector(Selectors.saveButton).style.display = "inline";
            document.querySelector(Selectors.deleteButton).style.display = "inline";
            document.querySelector(Selectors.cancelButton).style.display = "inline";
        },
        updateProduct: function (updatedProduct) {
            let updatedItem = null;

            const rows = document.querySelectorAll(Selectors.productListItem);
            rows.forEach(row => {

                if (row.firstElementChild.textContent == updatedProduct.id) {
                    row.firstElementChild.nextElementSibling.textContent = updatedProduct.name;
                    row.firstElementChild.nextElementSibling.nextElementSibling.textContent = updatedProduct.price + " $";
                    updatedItem = row;
                }
            })

            return updatedItem;
        },
        deleteProductFromUI: function () {
            const rows = document.querySelectorAll(Selectors.productListItem);
            rows.forEach(row => {
                if (row.classList.contains("bg-warning")) {
                    row.remove();
                }
            });
            if (rows.length == 1) {
                this.hideCard();
            }
        }
    }

})()


// App Controller
const App = (function (ProductCtrl, UICtrl, StorageCtrl) {

    // private
    const UISelectors = UIController.getSelectors();

    // Load event listeners
    const loadEventListeners = function () {

        // add product event
        document.querySelector(UISelectors.addButton).addEventListener("click", productAddSubmit);

        // edit product event
        document.querySelector(UISelectors.productList).addEventListener("click", productEditClick);

        // edit product submit
        document.querySelector(UISelectors.saveButton).addEventListener("click", editProductSubmit);

        // cancel button click
        document.querySelector(UISelectors.cancelButton).addEventListener("click", cancelUpdate);

        // delete button submit
        document.querySelector(UISelectors.deleteButton).addEventListener("click", deleteProductSubmit);

    }

    const productAddSubmit = function (e) {
        
        e.preventDefault();

        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;
        if (productName !== "" && productPrice !== "") {
            // add product
            const newProduct = ProductController.addProduct(productName, productPrice);

            // add item to UI list
            UIController.addProduct(newProduct);

            // add product to local storage
            StorageCtrl.storeProduct(newProduct);

            // get total
            let total = ProductController.calculateTotal();
            ProductController.setTotal(total);
            total = ProductController.getTotal(); // getter
            // show total
            UIController.displayTotal(total);
            // clear inputs
            UIController.clearInputs();
        }
        
    }

    const productEditClick = function (e) {

        e.preventDefault();

        if (e.target.classList.contains("edit-product")) {
            let id = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

            // get selected product
            const product = ProductController.getProductById(id);

            // set current product
            ProductController.setSelectedProduct(product);

            // get current product
            const selectedProduct = ProductCtrl.getSelectedProduct();

            // add selected product to UI form
            UICtrl.addProductToForm(selectedProduct);
            // selected row
            const rowElement = e.target.parentElement.parentElement

            UICtrl.editState(rowElement);
        }

    }

    const editProductSubmit = function (e) {
        e.preventDefault();

        let productName = document.querySelector(UISelectors.productName).value;
        let productPrice = document.querySelector(UISelectors.productPrice).value;

        if (productName !== "" && productPrice !== "") {
            // update product
            const updatedProduct = ProductCtrl.updateProduct(productName, productPrice);

            // update UI
            UICtrl.updateProduct(updatedProduct);

            // update storage
            StorageCtrl.updateProduct(updatedProduct);

            // get total
            let total = ProductController.calculateTotal();
            ProductController.setTotal(total);
            total = ProductController.getTotal();

            // show total
            UIController.displayTotal(total);

            UICtrl.clearBackgroundOfRows()
            UICtrl.addingState();
        }
        
    }

    const cancelUpdate = function (e) {
        e.preventDefault();
        UICtrl.addingState(); 
        UICtrl.clearBackgroundOfRows();      
        
    }

    const deleteProductSubmit = function (e) {
        e.preventDefault();
        
        // get selected product
        const selectedProduct = ProductCtrl.getSelectedProduct();
        console.log(selectedProduct.id)

        // delete product
        ProductCtrl.deleteProduct(selectedProduct.id);
        
        console.log("Deleted product: " + selectedProduct.name);

        // delete product from UI
        UICtrl.deleteProductFromUI();

        // delete product from storage
        StorageCtrl.deleteProduct(selectedProduct.id)

        // get total
        let total = ProductController.calculateTotal();
        ProductController.setTotal(total);
        total = ProductController.getTotal();

        // show total
        UIController.displayTotal(total);

        UICtrl.clearBackgroundOfRows()
        UICtrl.addingState();

    }

    return {
        // public
        init: function () {
            UICtrl.addingState(); // eğer addingState rowElement parametresi alırsa rowElement = null ya da fonksiyona parametrenin boş gönderilmesi de mümkün olabilir ama fonksiyon if check yapmalı içinde
            console.log("starting app...");
            const products = ProductController.getProducts();
            // total amount of card body when data added before
            let total = ProductController.calculateTotal();
            ProductController.setTotal(total);
            total = ProductController.getTotal();
            UIController.displayTotal(total);

            if (products.length === 0) {
                UIController.hideCard();
            } else {
                UIController.createProductList(products);
            }

            // load event listeners
            loadEventListeners();
        }
    }

})(ProductController, UIController, StorageController)

App.init();