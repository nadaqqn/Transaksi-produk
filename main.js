const product =[
    {
        id: 0,
        image: 'ZFlipFoldableMobile.jpg',
        title: 'Z Flip Foldable Mobile',
        price: 400,
    },
    {
        id: 1,
        image: 'AirPodsPro.jpg',
        title: 'Air Pods Pro',
        price: 100,
    },
    {
        id: 2,
        image: '250DDSLRCamera.jpg',
        title: '250D DSLR Camera',
        price: 140,
    },
    {
        id: 3,
        image: 'SonicGearAirPhone5.jpg',
        title: 'Sonic Gear AirPhone 5',
        price: 60,
    }
];
const categories = [...new Set(product.map((item)=>{return item}))]
let i = 0;

/* menyimpan item-item yang ada di keranjang */
var cart = [];

// Ganti kode categories.map(...) menjadi ini
document.getElementById('root').innerHTML = product.map((item) => {
    var { image, title, price } = item;
    return (
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
        <div class='bottom'>
        <p>${title}</p>
        <h2>$ ${price}.00</h2>` +
        "<button onclick='addtocart(" + (i++) + ")'>Tambahkan ke keranjang</button>" +
        `</div>
        </div>`
    );
}).join('');




//menambahkan produk ke dalam keranjang cart.
function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
}

//menghapus elemen dari keranjang cart.  akan menghapus 1 elemen dari array cart pada indeks a.
function delElement(a){
    cart.splice(a,1);
    displaycart();
}

/* fungsi yang menampilkan item dalam keranjang */
function displaycart(a){
    /* digunakan sebagai indeks untuk menghapus item dari keranjang */
    let j = 0, total = 0;
    //pemberian nilai pada id='count' yaitu sama 
    document.getElementById("count").innerHTML = cart.length;

    /* memeriksa apakah keranjang kosong atau tidak */
    if(cart.length==0){
        document.getElementById('cartItem').innerHTML = "Keranjang anda kosong";
        document.getElementById("total").innerHTML = "$ "+0+".00";
    }
    /* kondisi jika keranjang tidak kosong */
    else{
        /* map digunakan untuk iterasi isi dari array cart, sehingga menghasilkan kondisi yang sesuai untuk SETIAP item di keranjang */
        document.getElementById("cartItem").innerHTML = cart.map((items)=>
        {
            /* objek items memiliki beberapa properti seperti image, title, price */
            var {image, title, price} = items;
            total = total + price;
            document.getElementById("total").innerHTML = "$ "+total+".00";
            return(
                /* menampilkan informasi tentang item yang ada di keranjang, yaitu: gambar produk, judul produk, dan harga produk. Juga, ada ikon fa-trash yang digunakan untuk menghapus item dari keranjang. */
                `<div class='cart-item'>
                <div class ='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size:12px;'>${title}</p>
                <h2 style='font-size:15px;'>$ ${price}.00
                </h2>`+ 
                 /* Ini adalah ikon "fa-trash" dari Font Awesome yang akan berfungsi sebagai tombol untuk menghapus item dari keranjang. Saat ikon ini diklik, fungsi delElement akan dipanggil dengan argumen j (indeks item yang akan dihapus) dan nilai j akan ditingkatkan untuk menghapus item berikutnya pada saat berikutnya. */
                "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) + ")'></i></div>"
            );
        }).join('');
    }
}

/* Js untuk blockchain table */
// ...
function addRow(index, timestamp, amount, previousHash, hash) {
    var table = document.querySelector('table');
    var newRow = table.insertRow(-1);
    newRow.innerHTML = `<td>${index}</td><td>${timestamp}</td><td>${amount}</td><td>${previousHash}</td><td>${hash}</td>`;
}
var blockchainData = [
   
];

// Loop through the blockchainData and add rows to the table
blockchainData.forEach(block => {
    addRow(block.index, block.timestamp, block.amount, block.previousHash, block.hash);
});

// Variable untuk menyimpan indeks blockchain saat ini
let blockchainIndex = 1;


// Function untuk menghitung hash dari data blok
function calculateHash(index, timestamp, amount, previousHash) {
  const data = index + timestamp + amount + previousHash;
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
}

// Function untuk menambahkan blok ke dalam tabel blockchain
function addBlockToBlockchain(timestamp, amount, previousHash, hash) {
  addRow(blockchainIndex, timestamp, amount, previousHash, hash);
  blockchainIndex++;
}
function saveTotalAmount() {
    const totalAmount = '$ ' + cart.reduce((total, item) => total + item.price, 0) + '.00';
    // Misalkan Anda ingin menyimpan totalAmount ke dalam variabel atau melakukan operasi lain dengannya.
    // Di sini, kita hanya mencetaknya ke konsol untuk tujuan demonstrasi.
    console.log("Total Amount:", totalAmount);
}
// Function untuk menambahkan blok baru ke dalam blockchain
function addNewBlock() {
  const timestamp = new Date().toLocaleString();
  const totalAmount = '$ ' + cart.reduce((total, item) => total + item.price, 0) + '.00';
  const previousBlock = blockchainData[blockchainData.length - 1];
  const previousHash = previousBlock ? previousBlock.hash : '0'; // Menggunakan hash dari block sebelumnya atau '0' jika ini block pertama
  const hash = calculateHash(blockchainIndex, timestamp, totalAmount, previousHash);


  // Tambahkan blok baru ke dalam blockchainData
  blockchainData.push({
    index: blockchainIndex,
    timestamp: timestamp,
    amount: totalAmount,
    previousHash: previousHash,
    hash: hash,
  });

  // Tambahkan blok baru ke dalam tabel
  addBlockToBlockchain(timestamp, totalAmount, previousHash, hash);
}

// Function untuk menangani klik tombol submit
function submitData() {
    // Simpan total harga dalam keranjang
    saveTotalAmount();
    // Tambahkan blok baru ke dalam blockchain
    addNewBlock();
}

// Function untuk menghapus keranjang
function clearCart() {
    cart = [];
    displaycart();
  }