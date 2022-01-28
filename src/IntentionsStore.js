import fetchRetry from './FetchRetry';


class IntentionsStore {
    subscribers = [];

    getIntentions() {
        return fetchRetry('/api/intentions.php', {
            method: 'get'
        }).then((response) =>
            response.json()
        ).catch((err) => {
            console.log(err.message);
        });
    }

    addIntention(name, time, date, parkingSpace) {
        return fetchRetry('/api/intentions.php', {
            method: 'POST',
            body: JSON.stringify({name: name, visitTime: time, visitDate: date, parkingSpace: parkingSpace})
        }).then((response) => {
            console.log(response.text());
            this.subscribers.forEach((s) => s());
            return response
        }).catch((err) => {
            console.log(err.message);
            throw err;
        });
    }

    removeIntention(name, visitDate) {
        return fetchRetry('/api/intentions.php', {
            method: 'DELETE',
            body: JSON.stringify({name: name, visitDate: visitDate})
        }).then((response) => {
            console.log(response.text());
            this.subscribers.forEach((s) => s());
            return response
        }).catch((err) => {
            console.log(err.message);
            throw err;
        });
    }

    subscribe(f) {
        this.subscribers.push(f);
    }

    unsubscribe(f) {
        this.subscribers = this.subscribers.filter(item => item !== f)
    }
}

export default IntentionsStore