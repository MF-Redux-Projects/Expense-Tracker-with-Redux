export default function numberWithCommas(x) {
    //thousands separator
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}