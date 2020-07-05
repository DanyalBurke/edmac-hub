import fetchRetry from './FetchRetry';

class EventsStore {
    getEvents() {
        return fetchRetry('/api/events.php?days=7', {
            method: 'get'
        }).then((response) =>
            response.json()
        ).catch((err) =>
            console.log(err)
        );
    }
}

export default EventsStore