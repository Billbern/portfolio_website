function* generatePrimes() {
    const markedNotPrime = {};
    let valueToCheck = 2;
    while(true) {
        if (!(valueToCheck in markedNotPrime)) {
            yield valueToCheck
            markedNotPrime[valueToCheck**2] = [valueToCheck]
        } else {
            let primes =markedNotPrime[valueToCheck];
            primes.forEach(prime=> {
                let nextMultipleOfPrime = prime + valueToCheck;
                if (nextMultipleOfPrime in markedNotPrime) {
                    markedNotPrime[nextMultipleOfPrime].push(prime);
                } else {
                    markedNotPrime[nextMultipleOfPrime] = [prime];
                }
            })
            delete markedNotPrime[valueToCheck];
        }
        valueToCheck += 1
    }
}

let gen = generatePrimes();
let primeRandom = {}

for(let i=1; i<26; i++){
    primeRandom[String(gen.next().value)] = true
}

export default primeRandom;