import fetchRetry from './FetchRetry';


class IntentionsStore {
    subscribers = [];

    getIntentions() {
        return fetchRetry('/api/intentions.php', {
            method: 'get'
        }).then((response) =>
            response.json()
        ).catch((err) =>
            console.log(err)
        );
    }

    addIntention(name, time) {
        fetchRetry('/api/intentions.php', {
            method: 'POST',
            body: JSON.stringify({name: name, visitTime: time})
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
        fetchRetry('/api/intentions.php', {
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