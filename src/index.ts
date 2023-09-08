import data from './data.json' assert { type: 'json' };

interface Purchase {
	readonly item: string;
	readonly quantity: number;
	readonly price: number;
}

interface Client {
	readonly name: string;
	readonly location: string;
	readonly purchases: Array<Purchase>;
}

const groupByLocation = (data: Client[]) => {
	return data.reduce(
		(acc, client) => {
			const { location } = client;

			acc[location] = [...(acc?.[location] ?? []), client];

			return acc;
		},
		{} as Record<string, Client[]>,
	);
};

const pirkkaParhaatAsiakkaat = (data: Client[]) => {
	return data.filter(({ purchases }) => {
		return (
			purchases.reduce((acc, { quantity, price }) => {
				return acc + quantity * price;
			}, 0) >= 100
		);
	});
};

const grouped = groupByLocation(pirkkaParhaatAsiakkaat(data));

console.log(JSON.stringify(grouped, null, 2));
