/// <reference types="node" />
import { NetConnectOpts } from "net";
import { ConnectionOptions } from "tls";
/**
 * Class representing Ignite client configuration.
 *
 * The configuration includes:
 *   - (mandatory) Ignite node endpoint(s)
 *   - (optional) user credentials for authentication
 *   - (optional) TLS enabling
 *   - (optional) connection options
 */
export declare class IgniteClientConfiguration {
    private _userName;
    private _password;
    private _useTLS;
    private _partitionAwareness;
    private _endpoints;
    private _options;
    /**
     * Creates an instance of Ignite client configuration
     * with the provided mandatory settings and default optional settings.
     *
     * By default, the client does not use authentication and secure connection.
     * The Partition Awareness feature is disabled by default.
     *
     * @param {...string} endpoints - Ignite node endpoint(s).
     *  The client randomly connects/reconnects to one of the specified node.
     *
     * @return {IgniteClientConfiguration} - new client configuration instance.
     *
     * @throws {IgniteClientError} if error.
     */
    constructor(...endpoints: string[]);
    /**
     * Sets username which will be used for authentication during the client's connection.
     *
     * If username is not set, the client does not use authentication during connection.
     *
     * @param {string} userName - username. If null, authentication is disabled.
     *
     * @return {IgniteClientConfiguration} - the same instance of the IgniteClientConfiguration.
     *
     * @throws {IgniteClientError} if error.
     */
    setUserName(userName: string): IgniteClientConfiguration;
    /**
     * Sets password which will be used for authentication during the client's connection.
     *
     * Password is ignored, if username is not set.
     * If password is not set, it is considered empty.
     *
     * @param {string} password - password. If null, password is empty.
     *
     * @return {IgniteClientConfiguration} - the same instance of the IgniteClientConfiguration.
     *
     * @throws {IgniteClientError} if error.
     */
    setPassword(password: string): IgniteClientConfiguration;
    /**
     * Sets connection options.
     *
     * By default the client establishes a non-secure connection with default connection options defined by nodejs.
     *
     * @param {boolean} useTLS - if true, secure connection will be established;
     *                           if false, non-secure connection will be established.
     * @param {object} [connectionOptions=null] - connection options.
     *   - For non-secure connection options defined here {@link https://nodejs.org/api/net.html#net_net_createconnection_options_connectlistener}
     *   - For secure connection options defined here {@link https://nodejs.org/api/tls.html#tls_tls_connect_options_callback}
     * @param {boolean} [partitionAwareness=false] - if true, the Partition Awareness feature will be enabled. Otherwise, disabled.
     *
     * @return {IgniteClientConfiguration} - the same instance of the IgniteClientConfiguration.
     */
    setConnectionOptions(useTLS: boolean, connectionOptions?: NetConnectOpts | ConnectionOptions, partitionAwareness?: boolean): this;
    get userName(): string;
    get password(): string;
    get options(): NetConnectOpts | ConnectionOptions;
    get partitionAwareness(): boolean;
    get useTLS(): boolean;
    get endpoints(): string[];
}
//# sourceMappingURL=IgniteClientConfiguration.d.ts.map