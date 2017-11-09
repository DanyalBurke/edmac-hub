import 'whatwg-fetch';

class IntentionsStore {
    subscribers = [];

    getIntentions() {
        return fetch('/api/intentions.php5', {
            method: 'get'
        }).then((response) =>
            response.json()
        ).catch((err) =>
            console.log(err)
        );
    }

    addIntention(name, time) {
        fetch('/api/intentions.php5', {
            method: 'POST',
            body: JSON.stringify({name: name, time: time})
        }).then((response) =>
            response.text()
        ).then((response) => {
            console.log(response);
            this.subscribers.forEach((s) => s());
        }).catch((err) =>
            console.log(err)
        );
    }

    removeIntention(name) {
        fetch('/api/intentions.php5', {
            method: 'DELETE',
            body: JSON.stringify({name: name})
        }).then((response) =>
            response.text()
        ).then((response) => {
            console.log(response);
            this.subscribers.forEach((s) => s());
        }).catch((err) =>
            console.log(err)
        );
    }

    subscribe(f) {
        this.subscribers.push(f);
    }
}

export default IntentionsStore